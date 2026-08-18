export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import productsData from '@/data/products.json';
import { ensureProductsSeeded } from '@/lib/seed';

export async function GET() {
  try {
    await ensureProductsSeeded();

    let products: any[] = [];
    try {
      products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (e) {
      console.warn('Prisma query failed, falling back to JSON data', e);
      products = productsData as any[];
    }

    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch (authError) {
      console.warn('Auth session failed, assuming non-admin', authError);
    }
    const isAdmin = session && (session.user as any)?.role === 'admin';

    if (!isAdmin) {
      const safeProducts = products.map((p) => {
        const { costPrice, ...rest } = p;
        return rest;
      });
      return NextResponse.json(safeProducts);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ensureProductsSeeded();
    const body = await request.json();
    console.log("==== [DEBUG] Received POST body ====", JSON.stringify(body, null, 2));

    const missing = [];
    if (!body.name) missing.push('name');
    if (!body.category) missing.push('category');
    if (!body.categoryName) missing.push('categoryName');
    if (body.price === undefined || body.price === null || body.price === '') missing.push('price');

    if (missing.length > 0) {
      return NextResponse.json({ 
        error: `필수 항목 누락: ${missing.join(', ')}`,
        receivedBody: body 
      }, { status: 400 });
    }

    const productId = (body.id && typeof body.id === 'string' && body.id.trim() !== '') ? body.id.trim() : undefined;
    
    const newProduct = await prisma.product.create({
      data: {
        id: productId,
        name: String(body.name),
        category: String(body.category),
        categoryName: String(body.categoryName),
        subCategory: body.subCategory ? String(body.subCategory) : null,
        price: Number(body.price) || 0,
        originalPrice: body.originalPrice !== undefined && body.originalPrice !== null && body.originalPrice !== '' ? Number(body.originalPrice) : null,
        costPrice: body.costPrice !== undefined && body.costPrice !== null && body.costPrice !== '' ? Number(body.costPrice) : null,
        image: body.image ? String(body.image) : null,
        detailImage: body.detailImage ? String(body.detailImage) : null,
        inputVoltage: body.inputVoltage ? String(body.inputVoltage) : null,
        outputVoltage: body.outputVoltage ? String(body.outputVoltage) : null,
        capacity: body.capacity ? String(body.capacity) : null,
        description: body.description ? String(body.description) : null,
      }
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: '상품 등록에 실패했습니다.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
