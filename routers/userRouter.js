const router = require("express").Router();
const {
	signIn,
	signUp,
	userProfile,
	changePassword,
	getUserProfile,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.route("/").post(signIn);
router.route("/signup").post(signUp);
router.route("/profile").post(auth, userProfile).get(auth, getUserProfile);
router.route("/change_password").post(auth, changePassword);

module.exports = router;
