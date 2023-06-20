const Brand = require("../models/Brand");

const asyncHandler = require("express-async-handler");

// @desc Create new brand
// @route POST /brands
// @access Private

const createBrand = asyncHandler(async (req, res) => {
  const brand = new Brand(req.body);

  const doc = await brand.save();

  if (doc) {
    res.status(201).json(doc);
  } else {
    res.status(400).json(err);
  }
});

// @desc Get all brands
// @route GET /brands
// @access Private

const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({}).lean().exec();

  if (!brands.length) {
    res.status(400).json({ message: "no brand found" });
  } else {
    res.status(200).json(brands);
  }
});

module.exports = {
  createBrand,
  getAllBrands,
};
