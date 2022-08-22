const router = require("express").Router();
const {
	allProducts,
	filterProducts,
	productDetails,
	searchProducts,
	getPageCount,
	specificProducts,
	relevantBrands,
} = require("../controllers/productController");

router.route("/relevant/:id").get(relevantBrands);

router.route("/all").get(specificProducts);
router.route("/countPages").get(getPageCount);
router.route("/:id").get(productDetails);
router.route("/search/:key").get(searchProducts);
router.route("/").get(allProducts).post(filterProducts);

module.exports = router;
