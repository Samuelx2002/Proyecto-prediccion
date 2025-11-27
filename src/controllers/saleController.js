const Sale = require("../../models/Sale.js");

exports.getSales = async (req, res) => {
  const { dateStart, dateEnd } = req.query;

  const filter = {};

  if (dateStart && dateEnd) {
    filter.date = { $gte: new Date(dateStart), $lte: new Date(dateEnd) };
  }

  const sales = await Sale.find(filter).populate("productId");
  res.json(sales);
};

exports.createSale = async (req, res) => {
  const sale = await Sale.create(req.body);
  res.json(sale);
};
