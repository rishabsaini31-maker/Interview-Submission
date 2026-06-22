const express = require('express');
const { getProductsController, healthController } = require('../controllers/productController');

const router = express.Router();

router.get('/products', getProductsController);
router.get('/health', healthController);

module.exports = router;