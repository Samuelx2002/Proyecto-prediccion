const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  date: Date
});

module.exports = mongoose.model("Sale", SaleSchema);