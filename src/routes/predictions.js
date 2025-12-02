const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');

// Rutas de predicción
router.post('/predict', predictionController.predictStock);
router.post('/predict/batch', predictionController.predictStockBatch);
router.get('/predict/auto', predictionController.predictStockAuto);
router.get('/model/info', predictionController.getModelInfo);
router.get('/status', predictionController.checkMLService);

module.exports = router;
