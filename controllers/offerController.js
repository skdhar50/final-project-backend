const { Offer } = require("../models/offer");

module.exports.getAllOffers = async (req, res) => {
	const offers = await Offer.find({ status: "active" });

	return res.status(200).send({ data: offers });
};

module.exports.getSingleOffer = async (req, res) => {
    const offer = await Offer.find({ status: "active", _id: req.params.id });

    return res.status(200).send({ data: offer });
}
