const router = require("express").Router();
const { getReviews, postReview } = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

router.route("/:id").get(getReviews).post(auth, postReview);

module.exports = router;
