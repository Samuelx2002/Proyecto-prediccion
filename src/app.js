const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection } = require('./config/database');
const productRoutes = require('./routes/products');
const saleRoutes = require('./routes/sales');
const predictionRoutes = require('./routes/predictions');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (dashboard)
app.use(express.static(path.join(__dirname, '../public')));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🎰 API Casino Santo Tomás - Sistema de Predicción de Compras',
    version: '1.0.0',
    dashboard: 'http://localhost:' + (process.env.PORT || 3000) + '/dashboard.html',
    endpoints: {
      productos: '/api/products',
      ventas: '/api/sales',
      estadisticas: '/api/sales/stats',
      predicciones: '/api/predictions'
    }
  });
});

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/predictions', predictionRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Verificar conexión a la base de datos
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('⚠️  No se pudo conectar a la base de datos');
      console.log('📝 Verifica tu configuración en el archivo .env');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log('🚀 Servidor iniciado correctamente');
      console.log('='.repeat(50));
      console.log(`📡 Puerto: ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`🗄️  Base de datos: ${process.env.DB_NAME}`);
      console.log('='.repeat(50) + '\n');
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
