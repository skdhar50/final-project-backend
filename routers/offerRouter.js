const router = require("express").Router();
const {
	getAllOffers,
	getSingleOffer,
} = require("../controllers/offerController");

router.route("/").get(getAllOffers);
router.route("/:id").get(getSingleOffer);

module.exports = router;
