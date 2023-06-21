const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const orders = await Order.find({ user: id });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400).json({ message: "something went wrong" });
  }
});

module.exports = {
  getOrderById,
};
