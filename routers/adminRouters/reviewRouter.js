const router = require("express").Router();
const { reviewList, updateReview, removeReview } = require("../../controllers/adminControllers/reviewController");
const { updateReviewValidator, validationHandler } = require("../../middlewares/validator/validator");

router.get('/', reviewList);
router.put('/:id', updateReviewValidator, validationHandler, updateReview);
router.delete('/:id', removeReview)

module.exports = router;
