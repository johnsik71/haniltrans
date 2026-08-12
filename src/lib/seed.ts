import { prisma } from '@/lib/prisma';
import productsData from '@/data/products.json';

export async function ensureProductsSeeded() {
  try {
    const count = await prisma.product.count();
    if (count === 0 && productsData && Array.isArray(productsData) && productsData.length > 0) {
      const formatted = (productsData as any[]).map((p) => ({
        id: String(p.id),
        name: String(p.name),
        category: String(p.category),
        categoryName: String(p.categoryName || p.category),
        subCategory: p.subCategory ? String(p.subCategory) : null,
        price: Number(p.price) || 0,
        originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
        costPrice: p.costPrice ? Number(p.costPrice) : null,
        image: p.image ? String(p.image) : null,
        inputVoltage: p.inputVoltage ? String(p.inputVoltage) : null,
        outputVoltage: p.outputVoltage ? String(p.outputVoltage) : null,
        capacity: p.capacity ? String(p.capacity) : null,
        description: p.description ? String(p.description) : null,
      }));

      try {
        await prisma.product.createMany({ data: formatted });
      } catch (err) {
        console.warn('createMany failed during auto-seed, falling back to sequential inserts', err);
        for (const item of formatted) {
          await prisma.product.create({ data: item }).catch((e) => {
            console.warn(`Failed to seed product ${item.id}:`, e);
          });
        }
      }
    }
  } catch (error) {
    console.warn('Auto-seed check failed:', error);
  }
}
