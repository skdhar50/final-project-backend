const router = require("express").Router();
const {initPayment} = require('../controllers/paymentController');
const auth = require("../middlewares/auth");

router.route("/").get(auth, initPayment)

module.exports = router;