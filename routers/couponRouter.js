const router = require("express").Router();
const { getCoupon } = require("../controllers/couponController");
const auth = require("../middlewares/auth");

router.route("/").post(auth, getCoupon);

module.exports = router;
