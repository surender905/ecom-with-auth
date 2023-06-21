const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");

const fetchCartByUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const cartItems = await Cart.find({ user: id }).populate("product");
  if (cartItems) {
    res.status(200).json(cartItems);
  } else {
    res.status(400).json({ message: "unable to fetch cart data" });
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const cart = new Cart({ ...req.body, user: id });

  const doc = await cart.save();
  const result = await doc.populate("product");
  if (result) {
    res.status(201).json(result);
  } else {
    res.status(400).json({ message: "unable to add in cart" });
  }
});

const deleteFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await Cart.findByIdAndDelete(id);
  if (doc) {
    res.status(200).json(doc);
  } else {
    res.status(400).json({ message: "Unable to delete" });
  }
});

const updateCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cart = await Cart.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (cart) {
    const result = await cart.populate("product");

    res.status(200).json(result);
  } else {
    res.status(400).json({ message: "Unable to add in cart" });
  }
});

module.exports = {
  fetchCartByUser,
  addToCart,
  deleteFromCart,
  updateCart,
};
