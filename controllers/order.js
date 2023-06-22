const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const User = require("../models/User");

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const orders = await Order.find({ user: id });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400).json({ message: "something went wrong" });
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const order = new Order(req.body);

  for (let item of order.items) {
    let product = await Product.findOne({ _id: item.product.id });
    product.$inc("stock", -1 * item.quantity);
    // for optimum performance we should make inventory outside of product.
    await product.save();
  }

  const doc = await order.save();

  if (doc) {
    const user = await User.findById(order.user);
    sendMail({
      to: user.email,
      html: invoiceTemplate(order),
      subject: "Order Received",
    });
    res.status(201).json(doc);
  } else {
    res.status(400).json({ message: "something went wrong" });
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400).json({ message: "something went wrong" });
  }
});




module.exports = {
  getOrderById,
  createOrder,
  deleteOrder,
};
