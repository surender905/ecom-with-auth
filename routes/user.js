const express = require("express");
const { getUserById, updateUserById } = require("../controllers/user");
const router = express.Router();

router.route("/:id").get(getUserById).patch(updateUserById);

module.exports = router;
