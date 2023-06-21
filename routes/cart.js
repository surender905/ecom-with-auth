const express = require("express");
const {
  fetchCartByUser,
  addToCart,
  updateCart,
  deleteFromCart,
} = require("../controllers/cart");

const router = express.Router();
router.route("/").get(fetchCartByUser).post(addToCart);

router.patch("/:id", updateCart).delete("/:id", deleteFromCart);

module.exports = router;
