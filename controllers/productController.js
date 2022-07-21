const { Product } = require("../models/product");
const url = require("url");

module.exports.allProducts = async (req, res) => {
	const products = await Product.find()
		.limit(20)
		.populate("category", "name")
		.populate("brand", "name");

	return res.status(200).send({ data: products });
};

module.exports.getPageCount = async (req, res) => {
	const pageCount = await Product.countDocuments();

	return res.status(200).send({ data: Math.ceil(pageCount / 20) });
};

module.exports.searchProducts = async (req, res) => {
	const products = await Product.find({
		name: { $regex: req.params.key, $options: "i" },
	})
		.select({ photos: 1 })
		.select({ name: 1, _id: 1 })
		.limit(10);
	// console.log(products);
	return res.status(200).send({ data: products });
};

module.exports.productDetails = async (req, res) => {
	const product = await Product.find({ _id: req.params.id })
		.populate("category", "name")
		.populate("brand", "name");

	return res.status(200).send({ data: product });
};

module.exports.filterProducts = async (req, res) => {
	// Collecting the request body
	let { order, sortBy, limit, skip, filters } = req.body;
	// Object of filter of keys [price & category]
	let args = {};

	// Setting the default values of request body
	order = order === "desc" ? -1 : 1;
	sortBy = sortBy ? sortBy : "_id";
	limit = 20;
	skip = skip ? parseInt(skip) : 0;

	// Setting up the filter constraints
	for (let key in filters) {
		if (key === "isExclusive" && filters[key] === false) {
			continue;
		}
		if (filters[key].length > 0) {
			args[key] = {
				$in: filters[key],
			};
		}
	}

	// Fatching the data from the database using the request body
	const pages = await Product.find({ ...args }).countDocuments();

	const products = await Product.find({ ...args })
		.sort({ [sortBy]: order })
		.skip(skip * limit)
		.limit(limit)
		.populate("category")
		.populate("brand");

	// Sending back the results
	return res.status(200).send({ data: products, pages: Math.ceil(pages / 20) });
};

module.exports.specificProducts = async (req, res) => {
	// console.log("Specific Products");
	const query = url.parse(req.url, true).query;
	const temp = { ...query };
	const key = Object.keys(temp)[0];
	const value = Object.values(temp)[0];
	const currentPage = Object.values(temp)[1];
	// AccessoriesHuawei

	// console.log(key, value);
	console.log(currentPage);
	const pages = await Product.find({ [key]: { $in: value } }).countDocuments();
	const products = await Product.find({
		[key]: { $in: value },
	})
		.skip((currentPage - 1) * 20)
		.limit(20);

	console.log(Math.ceil(pages / 20));
	return res.status(200).send(products);

	// console.log(Object.keys(temp)[0], Object.values(temp)[0]);
};
