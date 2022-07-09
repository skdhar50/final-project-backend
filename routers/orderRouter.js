const router = require("express").Router();
const { placeOrder, getOrders } = require("../controllers/orderController");
const auth = require("../middlewares/auth");

router.route("/").get(auth, getOrders).post(auth, placeOrder);

module.exports = router;
