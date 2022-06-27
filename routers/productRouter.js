const router = require("express").Router();
const { allProducts } = require("../controllers/productController");

router.route("/").get(allProducts);

module.exports = router;
