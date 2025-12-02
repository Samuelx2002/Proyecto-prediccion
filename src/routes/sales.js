const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Rutas de ventas
router.get('/', saleController.getAllSales);
router.get('/stats', saleController.getSalesStats);
router.get('/rango', saleController.getSalesByDateRange);
router.get('/:id', saleController.getSaleById);
router.post('/', saleController.createSale);

module.exports = router;
