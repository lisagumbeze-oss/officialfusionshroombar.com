const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const order = await prisma.order.findFirst();
    console.log('Order fields:', Object.keys(order || {}));
    
    const shipping = await prisma.shippingSetting.findMany();
    console.log('Shipping settings count:', shipping.length);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

check();
