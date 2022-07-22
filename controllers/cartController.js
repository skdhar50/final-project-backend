const { CartItem } = require("../models/cartItem");
const _ = require("lodash");

module.exports.getCartItems = async (req, res) => {
	const items = await CartItem.find({ user: req.user._id }).populate(
		"product",
		"name unitPrice photos description"
	);
	// .populate("user", "name");

	return res.status(200).send({ data: items });
};

module.exports.selectAllCartItems = async (req, res) => {
	const items = await CartItem.updateMany(
		{ user: req.user._id },
		{ isSelected: req.body.flag }
	);

	return res.status(200).send({ data: items });
};

module.exports.selectSingleItem = async (req, res) => {
	const item = await CartItem.updateOne(
		{ _id: req.body._id, user: req.user._id },
		{ isSelected: req.body.flag }
	);

	return res.status(200).send({ data: item });
};

module.exports.removeCartItem = async (req, res) => {
	const cartItem = await CartItem.findByIdAndDelete(req.params.id);
	return res.send({
		data: cartItem,
		message: "Item deleted successfully!",
		type: "success",
	});
};

module.exports.addCartItem = async (req, res) => {
	const product = req.body.product;

	const item = await CartItem.findOne({
		user: req.user._id,
		product: product,
	});

	if (item) {
		return res
			.status(400)
			.send({ message: "Item already in cart", type: "warn" });
	}

	const cartItem = new CartItem({
		product: product,
		user: req.user._id,
	});

	await cartItem.save();
	return res
		.status(200)
		.send({ message: "Item saved to cart successfully!", type: "success" });
};

module.exports.updateCartItem = async (req, res) => {
	const { _id, count } = _.pick(req.body, ["_id", "count"]);

	await CartItem.updateOne({ _id: _id, user: req.user._id }, { count: count });

	return res
		.status(200)
		.send({ message: "Item updated successfully!", type: "success" });
};

module.exports.deleteCartItem = async (req, res) => {
	const id = req.params.id;

	await CartItem.deleteOne({ _id: id, user: req.user._id });
	return res
		.status(200)
		.send({ message: "Item deleted successfully!", type: "success" });
};
