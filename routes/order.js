const { Router } = require("express");
const { getOrderById } = require("../controllers/order");
const router = Router();

router.route("/").get(getOrderById);

module.exports = {
  router,
};
