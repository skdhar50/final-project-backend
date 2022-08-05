const router = require("express").Router();
const {
	getReviews,
	postReview,
	isReviewed,
	getOverallReating,
} = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

router.route("/:id").get(getReviews).post(auth, postReview);
router.route("/user/:product").get(auth, isReviewed);
router.route("/product/:product_id").get(getOverallReating);

module.exports = router;
