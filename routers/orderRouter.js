const router = require("express").Router();
const {
	placeOrder,
	getOrders,
	getOrderDetails,
} = require("../controllers/orderController");
const auth = require("../middlewares/auth");

router.route("/").get(auth, getOrders).post(auth, placeOrder);
router.route("/:id").get(auth, getOrderDetails);

module.exports = router;
