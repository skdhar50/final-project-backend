const { Product } = require("../models/product");

module.exports.allProducts = async (req, res) => {
	const products = await Product.find()
		.populate("category", "name")
		.populate("brand", "name");

	return res.status(200).send(products);
};

module.exports.filterProducts = async (req, res) => {
	// Collecting the request body
	let { order, sortBy, limit, skip, filters } = req.body;
	// Object of filter of keys [price & category]
	let args = {};

	// Setting the default values of request body
	order = order === "desc" ? -1 : 1;
	sortBy = sortBy ? sortBy : "_id";
	limit = limit ? parseInt(limit) : 20;
	skip = skip ? parseInt(skip) : 0;

	// Setting up the filter constraints
	for (let key in filters) {
		if (filters[key].length > 0) {
			args[key] = {
				$in: filters[key],
			};
		}
	}

	// Fatching the data from the database using the request body
	const products = await Product.find({ ...args })
		.sort({ [sortBy]: order })
		.limit(limit).populate("category").populate("brand");

	// Sending back the results
	return res.status(200).send(products);
};
