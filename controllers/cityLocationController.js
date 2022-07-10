const { CityLocation } = require("../models/cityLocation");

module.exports.getCityLocation = async (req, res) => {
	const locations = await CityLocation.find();

	return res.status(200).send(locations);
};
