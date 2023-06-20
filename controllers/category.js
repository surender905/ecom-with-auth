const Category = require("../models/Category");

const asyncHandler = require("express-async-handler");

// @desc Create new category
// @route POST /category
// @access Private

const createCategory = asyncHandler(async (req, res) => {
  const category = new Category(req.body);

  const doc = await category.save();

  if (doc) {
    res.status(201).json(doc);
  } else {
    res.status(400).json(err);
  }
});

// @desc Get all category
// @route GET /category
// @access Private

const getAllCategories = asyncHandler(async (req, res) => {
  const Categories = await Category.find({}).lean().exec();

  if (!Categories.length) {
    res.status(400).json({ message: "no categories found" });
  } else {
    res.status(200).json(Categories);
  }
});

module.exports = {
  createCategory,
  getAllCategories,
};
