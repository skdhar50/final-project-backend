const router = require("express").Router();
const { signIn } = require("../controllers/userController");

router.route("/").post(signIn);

module.exports = router;
