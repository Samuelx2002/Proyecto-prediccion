const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener ventas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sales");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear venta
router.post('/', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const result = await pool.query(
      "INSERT INTO sales (product_id, quantity) VALUES ($1,$2) RETURNING *",
      [product_id, quantity]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
