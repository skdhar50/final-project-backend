const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
	getCartItems,
	addCartItem,
	updateCartItem,
	selectAllCartItems,
	selectSingleItem,
	deleteCartItem,
} = require("../controllers/cartController");

router
	.route("/")
	.get(auth, getCartItems)
	.post(auth, addCartItem)
	.put(auth, updateCartItem);

router.route("/select_all").put(auth, selectAllCartItems);
router.route("/select_one").put(auth, selectSingleItem);

router.route("/:id").delete(auth, deleteCartItem);

module.exports = router;
