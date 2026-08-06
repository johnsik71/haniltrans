const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testCRUD() {
  console.log('Testing CRUD operations...');
  
  // 1. Create
  const newProduct = await prisma.product.create({
    data: {
      name: '테스트 변압기 9999',
      category: 'industrial',
      categoryName: '공업용 변압기',
      price: 99900,
    }
  });
  console.log('Created:', newProduct.name);

  // 2. Read
  const product = await prisma.product.findUnique({
    where: { id: newProduct.id }
  });
  console.log('Read:', product.name, 'Category:', product.category);

  // 3. Update
  const updated = await prisma.product.update({
    where: { id: newProduct.id },
    data: { price: 100000 }
  });
  console.log('Updated Price:', updated.price);

  // 4. Delete
  await prisma.product.delete({
    where: { id: newProduct.id }
  });
  console.log('Deleted successfully.');
}

testCRUD().catch(console.error).finally(() => prisma.$disconnect());
