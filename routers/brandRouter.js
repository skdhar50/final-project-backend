const router = require("express").Router();
const { getAllBrands } = require("../controllers/brandController");

router.route("/").get(getAllBrands);

module.exports = router;
