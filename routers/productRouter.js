const router = require("express").Router();
const {
	allProducts,
	filterProducts,
	productDetails,
	searchProducts,
} = require("../controllers/productController");

router.route("/").get(allProducts).post(filterProducts);
router.route("/:id").get(productDetails);
router.route("/search/:key").get(searchProducts);

module.exports = router;
