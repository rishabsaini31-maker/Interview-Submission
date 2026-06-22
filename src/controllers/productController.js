const { getProducts, healthCheck } = require('../services/productService');

const getProductsController = async (req, res, next) => {
  try {
    const { cursor, category, limit } = req.query;
    const result = await getProducts(cursor, category, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const healthController = async (req, res, next) => {
  try {
    const result = await healthCheck();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductsController,
  healthController
};