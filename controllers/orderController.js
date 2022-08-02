const { Order } = require("../models/order");
const { CartItem } = require("../models/cartItem");
const { ShippingAddress } = require("../models/shippingAddress");
const uuid = require("../utilities/helpers/uuid");
const _ = require("lodash");
const { Coupon } = require("../models/coupon");
const { request } = require("express");

function setOrderId() {
	let result = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < 8; i++) {
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
		name: temp.name,
		phone: temp.phone,
		city: temp.city,
		country: "Bangladesh",
		postalCode: "4000",
		address1: temp.area,
		address2: temp.fullAddress,
		state: temp.zone,
	};

	const newOrder = new Order({
		cartItem: tempCart,
		transaction_id: uuid(),
		order_id: setOrderId(),
		address: selectedShippingAddress,
		payment_method: paymentMethod,
		user: req.user._id,
		discount: req.body.discount,
		coupon: req.body.coupon,
	});

	const order = await newOrder.save();
	if (req.body.discount > 0) {
		await Coupon.updateOne(
			{ code: req.body.coupon },
			{
				$push: { appliers: { user: req.user._id, order_id: order._id } },
			}
		);
	}

	if (paymentMethod === "cod") {
		selectedProducts.forEach(async (item) => {
			const originalCount = await Product.find({
				_id: item.product._id,
			}).select({ quantity: 1 });

			await Product.updateOne(
				{
					_id: item.product._id,
				},
				{ quantity: originalCount[0] - item.count }
			);
		});
		
		await CartItem.deleteMany({ user: req.user._id, isSelected: true });
	}

	return res.status(200).send({
		data: order._id,
		message: "Order created successfully",
		type: "success",
	});
};
