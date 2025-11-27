const express = require('express');
const router = express.Router();
const pool = require('../db');

// Crear producto
router.post('/', async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;

    if (!name || !category || !price || !stock) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const result = await pool.query(
      "INSERT INTO products (name, category, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, category, price, stock]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
