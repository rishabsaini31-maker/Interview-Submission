const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { encodeCursor, decodeCursor } = require('../utils/cursor');

const DEFAULT_LIMIT = 20;

const getProducts = async (cursor, category, limit = DEFAULT_LIMIT) => {
  const take = Math.min(Math.max(parseInt(limit) || DEFAULT_LIMIT, 1), 100);
  
  const decodedCursor = decodeCursor(cursor);

  const where = {};
  if (category) {
    where.category = category;
  }

  if (decodedCursor) {
    where.OR = [
      { updated_at: { lt: decodedCursor.updatedAt } },
      {
        updated_at: decodedCursor.updatedAt,
        id: { lt: decodedCursor.id }
      }
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: [
      { updated_at: 'desc' },
      { id: 'desc' }
    ],
    take: take + 1
  });

  let nextCursor = null;
  if (products.length > take) {
    const lastProduct = products[take];
    nextCursor = encodeCursor(lastProduct.updated_at, lastProduct.id);
    products.pop();
  }

  return {
    products,
    nextCursor,
    hasMore: !!nextCursor
  };
};

const healthCheck = async () => {
  await prisma.$queryRaw`SELECT 1`;
  return { status: 'ok', timestamp: new Date().toISOString() };
};

module.exports = { getProducts, healthCheck };