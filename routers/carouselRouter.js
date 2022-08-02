const router = require("express").Router();
const { getCarousel } = require("../controllers/carouselController");

router.route("/").get(getCarousel);

module.exports = router;
