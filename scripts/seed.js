const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Database...')

  // Seed Products
  try {
    const productsPath = path.join(__dirname, '../src/data/products.json')
    if (fs.existsSync(productsPath)) {
      const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))
      for (const p of productsData) {
        await prisma.product.upsert({
          where: { id: p.id },
          update: {},
          create: {
            id: p.id,
            name: p.name,
            category: p.category,
            categoryName: p.categoryName,
            subCategory: p.subCategory,
            price: p.price,
            originalPrice: p.originalPrice || null,
            costPrice: p.costPrice || null,
            image: p.image || null,
            inputVoltage: p.inputVoltage || null,
            outputVoltage: p.outputVoltage || null,
            capacity: p.capacity || null,
            description: p.description || null,
          }
        })
      }
      console.log(`Seeded ${productsData.length} products.`)
    }
  } catch (e) {
    console.error('Error seeding products:', e)
  }

  // Seed Sales
  try {
    const salesPath = path.join(__dirname, '../src/data/sales.json')
    if (fs.existsSync(salesPath)) {
      const salesData = JSON.parse(fs.readFileSync(salesPath, 'utf8'))
      for (const s of salesData) {
        await prisma.sale.create({
          data: {
            id: s.id,
            productName: s.productName,
            quantity: s.quantity,
            unitPrice: s.unitPrice,
            totalSales: s.totalSales,
            totalCost: s.totalCost,
            margin: s.margin,
            orderDate: new Date(s.orderDate),
            status: s.status || 'COMPLETED',
          }
        }).catch(() => {}) // ignore duplicate id errors if run multiple times
      }
      console.log(`Seeded ${salesData.length} sales.`)
    }
  } catch (e) {
    console.error('Error seeding sales:', e)
  }

  // Seed Users
  try {
    const usersPath = path.join(__dirname, '../src/data/users.json')
    if (fs.existsSync(usersPath)) {
      const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'))
      for (const u of usersData) {
        await prisma.user.upsert({
          where: { email: u.email },
          update: {},
          create: {
            id: u.id || undefined,
            name: u.name,
            email: u.email,
            provider: u.provider,
            role: u.role || 'user',
            createdAt: new Date(u.createdAt),
          }
        })
      }
      console.log(`Seeded ${usersData.length} users.`)
    }
  } catch (e) {
    console.error('Error seeding users:', e)
  }

  console.log('Seeding completed.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
