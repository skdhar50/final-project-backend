const router = require("express").Router();
const {
	allProducts,
	filterProducts,
} = require("../controllers/productController");

router.route("/").get(allProducts).post(filterProducts);

module.exports = router;
