const router = require("express").Router();
const {
	getCategories,
	getFeaturedCategory,
} = require("../controllers/categoryController");

router.route("/").get(getCategories);
router.route("/featured").get(getFeaturedCategory);

module.exports = router;
