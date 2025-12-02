const { pool } = require('../config/database');

// Obtener todas las ventas
exports.getAllSales = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        v.id,
        v.cantidad,
        v.precio_unitario,
        v.total,
        v.metodo_pago,
        v.fecha_venta,
        p.nombre as producto_nombre,
        p.categoria as producto_categoria
      FROM ventas v
      INNER JOIN productos p ON v.producto_id = p.id
      ORDER BY v.fecha_venta DESC
    `);

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener ventas',
      error: error.message
    });
  }
};

// Obtener venta por ID
exports.getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT 
        v.id,
        v.cantidad,
        v.precio_unitario,
        v.total,
        v.metodo_pago,
        v.fecha_venta,
        p.nombre as producto_nombre,
        p.categoria as producto_categoria
      FROM ventas v
      INNER JOIN productos p ON v.producto_id = p.id
      WHERE v.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Venta no encontrada'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener venta:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener venta',
      error: error.message
    });
  }
};

// Crear nueva venta
exports.createSale = async (req, res) => {
  try {
    const { producto_id, cantidad, metodo_pago, fecha_venta } = req.body;

    if (!producto_id || !cantidad || !metodo_pago) {
      return res.status(400).json({
        success: false,
        message: 'producto_id, cantidad y metodo_pago son requeridos'
      });
    }

    // Obtener el precio del producto
    const [producto] = await pool.query(
      'SELECT precio FROM productos WHERE id = ? AND activo = TRUE',
      [producto_id]
    );

    if (producto.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    const precio_unitario = producto[0].precio;
    const total = precio_unitario * cantidad;
    const fecha = fecha_venta || new Date();

    const [result] = await pool.query(
      `INSERT INTO ventas (producto_id, cantidad, precio_unitario, total, metodo_pago, fecha_venta) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [producto_id, cantidad, precio_unitario, total, metodo_pago, fecha]
    );

    res.status(201).json({
      success: true,
      message: 'Venta registrada exitosamente',
      data: {
        id: result.insertId,
        producto_id,
        cantidad,
        precio_unitario,
        total,
        metodo_pago,
        fecha_venta: fecha
      }
    });
  } catch (error) {
    console.error('Error al crear venta:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear venta',
      error: error.message
    });
  }
};

// Obtener estadísticas de ventas
exports.getSalesStats = async (req, res) => {
  try {
    const [totalVentas] = await pool.query(
      'SELECT COUNT(*) as total, SUM(total) as monto_total FROM ventas'
    );

    const [ventasPorProducto] = await pool.query(`
      SELECT 
        p.nombre,
        COUNT(v.id) as cantidad_ventas,
        SUM(v.cantidad) as unidades_vendidas,
        SUM(v.total) as total_ventas
      FROM ventas v
      INNER JOIN productos p ON v.producto_id = p.id
      GROUP BY p.id, p.nombre
      ORDER BY total_ventas DESC
      LIMIT 10
    `);

    const [ventasPorMetodo] = await pool.query(`
      SELECT 
        metodo_pago,
        COUNT(*) as cantidad,
        SUM(total) as monto_total
      FROM ventas
      GROUP BY metodo_pago
    `);

    res.json({
      success: true,
      data: {
        resumen: totalVentas[0],
        productos_mas_vendidos: ventasPorProducto,
        ventas_por_metodo_pago: ventasPorMetodo
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
};

// Obtener ventas por rango de fechas
exports.getSalesByDateRange = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;

    if (!fecha_inicio || !fecha_fin) {
      return res.status(400).json({
        success: false,
        message: 'fecha_inicio y fecha_fin son requeridos'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        v.id,
        v.cantidad,
        v.precio_unitario,
        v.total,
        v.metodo_pago,
        v.fecha_venta,
        p.nombre as producto_nombre,
        p.categoria as producto_categoria
      FROM ventas v
      INNER JOIN productos p ON v.producto_id = p.id
      WHERE v.fecha_venta BETWEEN ? AND ?
      ORDER BY v.fecha_venta DESC
    `, [fecha_inicio, fecha_fin]);

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener ventas por rango:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener ventas',
      error: error.message
    });
  }
};
