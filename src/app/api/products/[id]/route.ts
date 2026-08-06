export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import productsData from '@/data/products.json';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    let product = null;
    try {
      product = await prisma.product.findUnique({
        where: { id }
      });
    } catch (e) {
      console.warn('Prisma query failed, falling back to JSON data', e);
    }
    
    if (!product) {
      product = (productsData as any[]).find(p => p.id === id);
    }
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch (authError) {
      console.warn('Auth session failed, assuming non-admin', authError);
    }
    const isAdmin = session && (session.user as any)?.role === 'admin';

    if (!isAdmin) {
      const { costPrice, ...safeProduct } = product;
      return NextResponse.json(safeProduct);
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
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

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
