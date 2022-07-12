const { Brand } = require("../models/brand");

module.exports.getAllBrands = async (req, res) => {
	const brands = await Brand.find().select({ name: 1 });
	return res.status(200).send({ data: brands });
};
