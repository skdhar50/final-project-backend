const router = require("express").Router();
const { placeOrder } = require("../controllers/orderController");
const auth = require("../middlewares/auth");

router.route("/").post(auth, placeOrder);

module.exports = router;
