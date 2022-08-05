const { Carousel } = require("../models/carousel");

module.exports.getCarousel = async (req, res) => {
	const carousel = await Carousel.find({status: 'active'});

	return res.status(200).send({ data: carousel });
};
