const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const products = await prisma.product.findMany();
    if (products.length > 0) {
      console.log('Deleting product:', products[0].id);
      await prisma.product.delete({ where: { id: products[0].id } });
      console.log('Successfully deleted');
    } else {
      console.log('No products to delete');
    }
  } catch (e) {
    console.error('Delete failed:', e);
  }
}

test();
