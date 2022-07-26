const PaymentSession = require("../utilities/helpers/paymentGateway");
const { Order } = require("../models/order");
const { CartItem } = require("../models/cartItem");
const { Payment } = require("../models/payment");
const path = require("path");
const _ = require("lodash");

module.exports.successPage = async (req, res) => {
	console.log(__basedir);
	res.sendFile(path.join(__basedir + "/public/pages/success.html"));
};
module.exports.failedPage = async (req, res) => {};

module.exports.ipnReceiver = async (req, res) => {
	const payment = new Payment(req.body);
	const tran_id = payment["tran_id"];

	console.log(req.body);

	if (payment["status"] === "VALID") {
		await CartItem.deleteMany({ user: req.user._id, isSelected: true });

		await Order.updateOne(
			{ transaction_id: tran_id },
			{ paymentStatus: "complete" }
		);
	} else if (payment["status"] === "FAILED") {
		await Order.deleteOne({ transaction_id: tran_id });
	}

	await payment.save();
	return res.status(200).send("IPN created successfully!");
};

module.exports.initPayment = async (req, res) => {
	// All selected products
	const orderDetails = await Order.find({ _id: req.params.id }).populate(
		"cartItem.product"
	);

	const selectedProducts = orderDetails[0].cartItem;
	const shippingAddress = orderDetails[0].address;
	const transaction_id = orderDetails[0].transaction_id;
	let payment = new PaymentSession();

	// Calculating the total_amount
	const total_amount = selectedProducts
		.map((item) => item.product.unitPrice * item.count)
		.reduce((a, b) => a + b, 0);

	const total_items = selectedProducts
		.map((item) => item.count)
		.reduce((a, b) => a + b, 0);

	payment.setUrls({
		success_url:
			"https://calm-fortress-09101.herokuapp.com/api/payment/success",
		fail_url: "yoursite.com/fail",
		cancel_url: "yoursite.com/cancel",
		ipn: "https://calm-fortress-09101.herokuapp.com/api/payment/ipn",
	});

	payment.setOrderInfo({
		total_amount: total_amount,
		currency: "BDT",
		tran_id: transaction_id,
		emi_option: 0,
	});

	const { name, address1, city, address2, phone, state } = shippingAddress;

	// Set customer info
	payment.setCustomerInfo({
		cus_name: name,
		cus_email: req.user.email,
		cus_add1: address1,
		cus_add2: address2,
		cus_city: city,
		cus_state: state,
		cus_postcode: 4000,
		cus_country: "Bangladesh",
		cus_phone: phone,
		cus_fax: phone,
	});

	// Set shipping info
	payment.setShippingInfo({
		shipping_method: "Courier",
		num_item: total_items,
		ship_name: name,
		ship_add1: address1,
		ship_add2: address2,
		ship_city: city,
		ship_state: state,
		ship_postcode: 4000,
		ship_country: "Bangladesh",
	});

	// Set Product Profile
	payment.setProductInfo({
		product_name: "Product Name",
		product_category: "General",
		product_profile: "general",
	});

	responseData = await payment.paymentInit();
	if (responseData["status"] === "SUCCESS") {
		await Order.updateOne(
			{ transaction_id: transaction_id },
			{ sessionKey: responseData["sessionkey"] }
		);
	}

	return res.status(200).send({ data: responseData });
};
