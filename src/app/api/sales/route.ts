export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sales = await prisma.sale.findMany({
      orderBy: { orderDate: 'desc' }
    });
    
    return NextResponse.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json({ error: 'Failed to read sales data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body; // Array of cart items

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
    }

    const createdSales = [];
    
    // Process each cart item and create a Sale record
    for (const item of items) {
      // Find the actual product to get costPrice
      const product = await prisma.product.findUnique({
        where: { id: item.product.id }
      });

      const unitPrice = item.product.price;
      const quantity = item.quantity;
      const totalSales = unitPrice * quantity;
      
      // Calculate margin if costPrice exists, else fallback to 0
      const costPrice = product?.costPrice || Math.floor(unitPrice * 0.7); // Mock 70% cost if missing for demo
      const totalCost = costPrice * quantity;
      const margin = totalSales - totalCost;

      const saleName = item.selectedOption 
        ? `${item.product.name} (${item.selectedOption.name})` 
        : item.product.name;

      const sale = await prisma.sale.create({
        data: {
          productName: saleName,
          quantity,
          unitPrice,
          totalSales,
          totalCost,
          margin,
          status: 'COMPLETED'
        }
      });
      createdSales.push(sale);
    }

    return NextResponse.json({ success: true, sales: createdSales }, { status: 201 });
  } catch (error) {
    console.error('Error creating sales:', error);
    return NextResponse.json({ error: 'Failed to record sales' }, { status: 500 });
  }
}
