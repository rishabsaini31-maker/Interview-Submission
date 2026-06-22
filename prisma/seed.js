const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const CATEGORIES = ['Electronics', 'Books', 'Fashion', 'Sports', 'Furniture', 'Grocery'];

const BATCH_SIZE = 5000;
const TOTAL_RECORDS = 200000;

function generateBatch() {
  const products = [];
  for (let i = 0; i < BATCH_SIZE; i++) {
    const createdAt = faker.date.recent({ days: 30 });
    products.push({
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(CATEGORIES),
      price: parseFloat(faker.commerce.price({ min: 10, max: 5000, dec: 2 })),
      created_at: createdAt,
      updated_at: faker.date.between({ from: createdAt, to: new Date() })
    });
  }
  return products;
}

async function main() {
  console.log('Starting seed...');
  
  const totalBatches = Math.ceil(TOTAL_RECORDS / BATCH_SIZE);
  let totalInserted = 0;

  for (let batch = 0; batch < totalBatches; batch++) {
    try {
      const products = generateBatch();
      
      await prisma.product.createMany({
        data: products,
        skipDuplicates: true
      });
      
      totalInserted += products.length;
      console.log(`Inserted batch ${batch + 1}/${totalBatches} (${totalInserted} total records)`);
    } catch (error) {
      console.error(`Error inserting batch ${batch + 1}:`, error.message);
      process.exit(1);
    }
  }

  console.log('Successfully inserted 200000 products.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });