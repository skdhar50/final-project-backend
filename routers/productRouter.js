const router = require("express").Router();
const {
	allProducts,
	filterProducts,
	productDetails
} = require("../controllers/productController");

router.route("/").get(allProducts).post(filterProducts);
router.route("/:id").get(productDetails)

module.exports = router;
