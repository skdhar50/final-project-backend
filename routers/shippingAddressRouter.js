const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
	getShippingAddress,
	updateShippingAddress,
	deleteShippingAddress,
	createShippingAddress,
} = require("../controllers/shippingAddressController");

router
	.route("/")
	.get(auth, getShippingAddress)
	.post(auth, createShippingAddress);
router
	.route("/:id")
	.put(auth, updateShippingAddress)
	.delete(auth, deleteShippingAddress);

module.exports = router;
