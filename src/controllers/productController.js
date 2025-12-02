const { pool } = require('../config/database');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE activo = TRUE ORDER BY nombre'
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE id = ? AND activo = TRUE',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener producto',
      error: error.message
    });
  }
};

// Crear nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y precio son requeridos'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO productos (nombre, precio, categoria) VALUES (?, ?, ?)',
      [nombre, precio, categoria || null]
    );

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: {
        id: result.insertId,
        nombre,
        precio,
        categoria
      }
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message
    });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria } = req.body;

    const [result] = await pool.query(
      'UPDATE productos SET nombre = ?, precio = ?, categoria = ? WHERE id = ?',
      [nombre, precio, categoria || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Producto actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
};

// Eliminar producto (soft delete)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'UPDATE productos SET activo = FALSE WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
};

// Obtener productos por categoría
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoria } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE categoria = ? AND activo = TRUE ORDER BY nombre',
      [categoria]
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};
