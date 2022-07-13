const { Order } = require("../models/order");
const { CartItem } = require("../models/cartItem");
const { ShippingAddress } = require("../models/shippingAddress");
const _ = require("lodash");

function getTransectionId() {
	let result = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < 5; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

module.exports.getOrderDetails = async (req, res) => {
	const order = await Order.find({ _id: req.params.id }).populate(
		"cartItem.product"
	);

	return res.status(200).send({ data: order });
};

module.exports.getOrders = async (req, res) => {
	const orders = await Order.find({ user: req.user._id })
		.sort({ createdAt: -1 })
		.populate("cartItem.product");

	return res.status(200).send({ data: orders });
};

module.exports.placeOrder = async (req, res) => {
	const selectedProducts = await CartItem.find({
		user: req.user._id,
		isSelected: true,
	});

	const temp = req.body.shipping;
	const paymentMethod = req.body.paymentMethod;
	let tempCart = [];

	selectedProducts.forEach((product) => {
		tempCart.push(_.pick(product, ["product", "count", "user", "isSelected"]));
	});

	const selectedShippingAddress = {
		phone: temp.phone,
		city: temp.city,
		country: "Bangladesh",
		postalCode: "4000",
		address1: temp.area,
		address2: temp.fullAddress,
	};

	const newOrder = new Order({
		cartItem: tempCart,
		address: selectedShippingAddress,
		transaction_id: getTransectionId(),
		payment_method: paymentMethod,
		user: req.user._id,
		discount: req.body.discount,
	});

	await newOrder.save();
	await CartItem.deleteMany({ user: req.user._id, isSelected: true });

	return res
		.status(200)
		.send({ message: "Order created successfully", type: "success" });
};
