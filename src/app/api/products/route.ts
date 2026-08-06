export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import productsData from '@/data/products.json';

export async function GET() {
    let products = [];
    try {
      products = await prisma.product.findMany();
    } catch (e) {
      console.warn('Prisma query failed, falling back to JSON data', e);
    }
    
    // SQLite on Netlify Functions fallback
    if (!products || products.length === 0) {
      products = productsData as any[];
    }

    const session = await getServerSession(authOptions);
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

    const body = await request.json();
    
    const newProduct = await prisma.product.create({
      data: {
        id: body.id || undefined,
        name: body.name,
        category: body.category,
        categoryName: body.categoryName,
        subCategory: body.subCategory || null,
        price: body.price,
        originalPrice: body.originalPrice || null,
        costPrice: body.costPrice || null,
        image: body.image || null,
        inputVoltage: body.inputVoltage || null,
        outputVoltage: body.outputVoltage || null,
        capacity: body.capacity || null,
        description: body.description || null,
      }
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
