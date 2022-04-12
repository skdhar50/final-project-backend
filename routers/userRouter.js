const router = require("express").Router();
const {Hello} = require("../controllers/userController");

router.route("/").get(Hello);

module.exports = router;
