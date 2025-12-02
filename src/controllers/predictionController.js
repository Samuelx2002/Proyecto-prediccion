const axios = require('axios');

const ML_API_URL = process.env.ML_API_URL || 'http://localhost:5000';

// Predecir stock para un producto
exports.predictStock = async (req, res) => {
  try {
    const { producto, dia_semana, mes, cantidad_historica } = req.body;

    if (!producto) {
      return res.status(400).json({
        success: false,
        message: 'El campo "producto" es requerido'
      });
    }

    // Llamar a la API de Python
    const response = await axios.post(`${ML_API_URL}/api/predict`, {
      producto,
      dia_semana,
      mes,
      cantidad_historica
    });

    res.json({
      success: true,
      data: response.data.prediccion
    });

  } catch (error) {
    console.error('Error al predecir stock:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: 'Error en el modelo de predicción',
        error: error.response.data
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al conectar con el servicio de predicción',
      error: error.message
    });
  }
};

// Predecir stock para múltiples productos
exports.predictStockBatch = async (req, res) => {
  try {
    const { productos, dia_semana, mes } = req.body;

    if (!productos || !Array.isArray(productos)) {
      return res.status(400).json({
        success: false,
        message: 'El campo "productos" debe ser un array'
      });
    }

    // Llamar a la API de Python
    const response = await axios.post(`${ML_API_URL}/api/predict/batch`, {
      productos,
      dia_semana,
      mes
    });

    res.json({
      success: true,
      data: response.data.predicciones,
      total: response.data.total
    });

  } catch (error) {
    console.error('Error al predecir stocks:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al predecir stocks',
      error: error.message
    });
  }
};

// Predecir stock automático para todos los productos
exports.predictStockAuto = async (req, res) => {
  try {
    // Llamar a la API de Python
    const response = await axios.get(`${ML_API_URL}/api/predict/auto`);

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Error al predecir stocks automáticos:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al predecir stocks automáticos',
      error: error.message
    });
  }
};

// Obtener información del modelo
exports.getModelInfo = async (req, res) => {
  try {
    const response = await axios.get(`${ML_API_URL}/api/model/info`);

    res.json({
      success: true,
      data: response.data.modelo
    });

  } catch (error) {
    console.error('Error al obtener info del modelo:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener información del modelo',
      error: error.message
    });
  }
};

// Verificar estado del servicio ML
exports.checkMLService = async (req, res) => {
  try {
    const response = await axios.get(`${ML_API_URL}/`);

    res.json({
      success: true,
      message: 'Servicio de ML online',
      data: response.data
    });

  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Servicio de ML no disponible',
      error: error.message
    });
  }
};
