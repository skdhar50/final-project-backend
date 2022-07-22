const router = require("express").Router();
const {
	getWishlist,
	addToWishlist,
	removeFromWishlist,
	moveToCart,
} = require("../controllers/wishlistController");
const auth = require("../middlewares/auth");

router.route("/").get(auth, getWishlist);
router
	.route("/:id")
	.post(auth, addToWishlist)
	.put(auth, moveToCart)
	.delete(auth, removeFromWishlist);

module.exports = router;
