const router = require("express").Router();
const { reviewList, updateReview, removeReview } = require("../../controllers/adminControllers/reviewController");

router.get('/', reviewList);
router.put('/:id', updateReview);
router.delete('/:id', removeReview)

module.exports = router;
