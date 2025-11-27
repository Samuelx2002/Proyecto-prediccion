const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/product');
const salesRoutes = require('./routes/sales');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/product', productRoutes);
app.use('/sales', salesRoutes);

app.listen(process.env.PORT, () => {
  console.log("API corriendo en puerto", process.env.PORT);
});
