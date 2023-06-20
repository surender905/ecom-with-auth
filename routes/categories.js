const express = require("express");
const { getAllCategories, createCategory } = require("../controllers/category");

const router = express.Router();

router.route("/").post(createCategory).get(getAllCategories);

module.exports = router;
