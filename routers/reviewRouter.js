const router = require("express").Router();
const {
	getReviews,
	postReview,
	isReviewed,
} = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

router.route("/:id").get(getReviews).post(auth, postReview);
router.route("/user/:product").get(auth, isReviewed);

module.exports = router;
