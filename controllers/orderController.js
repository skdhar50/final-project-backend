const { Order } = require("../models/order");
const { CartItem } = require("../models/cartItem");
const { ShippingAddress } = require("../models/shippingAddress");
const _ = require("lodash");

module.exports.placeOrder = async (req, res) => {
	const selectedProducts = await CartItem.find({
		user: req.user._id,
		isSelected: true,
	});

	// console.log(...selectedProducts)

	// console.log(req.body)
	// console.log(selectedProducts)
	// const selectedShippingAddress = ShippingAddress.findOne({
	// 	user: req.user._id,
	// 	_id: req.body.shipping,
	// });

	const temp = req.body.shipping;
	const paymentMethod = req.body.paymentMethod;
	let tempCart = [];

	selectedProducts.forEach(prouct => {
		tempCart.push(
			_.pick(prouct, ["product", "count", "user"])
		)
	})

	console.log(tempCart)

	const selectedShippingAddress = {
		phone: temp.phone,
		city: temp.city,
		country: "Bangladesh",
		postalCode: "4000",
		address1: temp.area,
		address2: temp.fullAddress,
	};

	// console.log(selectedShippingAddress, paymentMethod)

	const newOrder = new Order({
		cartItem: tempCart,
		address: selectedShippingAddress,
		payment_method: paymentMethod,
		user: req.user._id,
		discount: req.body.discount,
	});

	// console.log(newOrder)
	await newOrder.save();
	// console.log("Here");
	await CartItem.deleteMany({ user: req.user._id, isSelected: true });

	return res.status(200).send("Order created successfully");
};
