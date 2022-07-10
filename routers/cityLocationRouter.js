const router = require("express").Router();
const { getCityLocation } = require("../controllers/cityLocationController");

router.route("/").get(getCityLocation);

module.exports = router;
