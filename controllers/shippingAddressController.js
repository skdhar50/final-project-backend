const { ShippingAddress } = require("../models/shippingAddress");

module.exports.getShippingAddress = async (req, res) => {
	const shippingAddress = await ShippingAddress.find({ user: req.user._id });
	return res.send(shippingAddress);
};

module.exports.createShippingAddress = async (req, res) => {
	const shippingAddress = new ShippingAddress({
		user: req.user._id,
		...req.body,
	});
	await shippingAddress.save();
	return res.status(200).send(shippingAddress);
};

module.exports.updateShippingAddress = async (req, res) => {
	const shippingAddress = await ShippingAddress.findOneAndUpdate(
		{ user: req.user._id, _id: req.params.id },
		{ $set: req.body },
		{ new: true }
	);
	return res.status(200).send(shippingAddress);
};

module.exports.deleteShippingAddress = async (req, res) => {
	await ShippingAddress.findOneAndDelete({
		user: req.user._id,
		_id: req.params.id,
	});
	return res.status(200).send("Item deleted successfully!");
};
