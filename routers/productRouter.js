const router = require("express").Router();
const {
	allProducts,
	filterProducts,
	productDetails,
	searchProducts,
	getPageCount,
} = require("../controllers/productController");

router.route("/countPages").get(getPageCount);
router.route("/").get(allProducts).post(filterProducts);
router.route("/:id").get(productDetails);
router.route("/search/:key").get(searchProducts);

module.exports = router;
