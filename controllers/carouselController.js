const { Carousel } = require("../models/carousel");

module.exports.getCarousel = async (req, res) => {
	const carousel = await Carousel.find();

	return res.status(200).send({ data: carousel });
};
