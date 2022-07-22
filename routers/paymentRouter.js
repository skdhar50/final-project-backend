const router = require("express").Router();
const {
	initPayment,
	ipnReceiver,
	successPage,
	failedPage,
} = require("../controllers/paymentController");
const auth = require("../middlewares/auth");

router.route("/:id").get(auth, initPayment);
router.route("/ipn").post(ipnReceiver);
router.route("/success").post(successPage);
router.route("/fail").post(failedPage);

module.exports = router;
