const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} = require("../controllers/product");
const router = express.Router();

router.get("/:id", getSingleProduct).patch("/:id", updateProduct);

router.route("/").post(createProduct).get(getAllProducts);

module.exports = router;
