const router = require("express").Router();
const { getQna, createQuestion } = require("../controllers/qnaController");
const auth = require("../middlewares/auth");

router.route("/:id").get(getQna).post(auth, createQuestion);

module.exports = router;