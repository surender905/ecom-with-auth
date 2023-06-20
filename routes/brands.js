const express = require("express");
const { createBrand, getAllBrands } = require("../controllers/brand");
const router = express.Router();

router.route("/").post(createBrand).get(getAllBrands);

module.exports = router;
