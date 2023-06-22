const Product = require("../models/Product.js");

const asyncHandler = require("express-async-handler");

// @desc Create new product
// @route POST /product
// @access Private

const createProduct = asyncHandler(async (req, res) => {
  // this product we have to get from API body
  const product = new Product(req.body);
  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );

  const doc = await product.save();

  if (doc) {
    // Created
    return res.status(201).json(doc);
  } else {
    return res.status(400).json({ message: "Invalid product data received" });
  }
});

// @desc Get all Product
// @route GET /product
// @access Private
const getAllProducts = asyncHandler(async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  console.log(req.query.category);

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  const docs = await query.lean().exec();

  // If no products
  if (!docs?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  res.set("X-Total-Count", totalDocs);
  res.status(200).json(docs);
});

// @desc Get single Product
// @route GET /:id product
// @access Private

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400).json(err);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );
  const updatedProduct = await product.save();

  if (updateProduct) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(400).json(err);
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
