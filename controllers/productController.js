const { Product } = require("../models/product");

module.exports.allProducts = async (req, res) => {
	const products = await Product.find()
		.populate("category", "name")
		.populate("brand", "name");

	return res.status(200).send(products);
};
