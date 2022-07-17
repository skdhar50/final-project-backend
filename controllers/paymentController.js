const PaymentSession = require("../utilities/helpers/paymentGateway");

module.exports.initPayment = async (req, res) => {
	let payment = new PaymentSession();

	payment.setUrls({
		success_url: "yoursite.com/success",
		fail_url: "yoursite.com/fail",
		cancel_url: "yoursite.com/cancel",
		// ipn: "yoursite.com/ipn",
	});

	payment.setOrderInfo({
		total_amount: 1570,
		currency: "BDT",
		tran_id: "shgdfhgsd3482476374",
		emi_option: 0,
	});

	// Set customer info
	payment.setCustomerInfo({
		cus_name: "ABC",
		cus_email: "abc@test.com",
		cus_add1: "66/A Midtown",
		cus_add2: "Andarkilla",
		cus_city: "Chittagong",
		cus_state: "Optional",
		cus_postcode: 4000,
		cus_country: "Bangladesh",
		cus_phone: "010000000000",
		cus_fax: "Customer_fax_id",
	});

	// Set shipping info
	payment.setShippingInfo({
		shipping_method: "Courier",
		num_item: 2,
		ship_name: "ABC",
		ship_add1: "66/A Midtown",
		ship_add2: "Andarkilla",
		ship_city: "Chittagong",
		ship_state: "Optional",
		ship_postcode: 4000,
		ship_country: "Bangladesh",
	});

	// Set Product Profile
	payment.setProductInfo({
		product_name: "Computer",
		product_category: "Electronics",
		product_profile: "general",
	});

	payment.paymentInit().then((data) => console.log(data));
};
