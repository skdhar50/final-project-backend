"use strict";
require("dotenv/config");
const FormData = require("form-data");
const fetch = require("node-fetch");

module.exports = class PaymentSession {
	constructor() {
		this.fdata = new FormData();

		this.URL = process.env.SSLCOMMERZ_SANDBOX;
		this.fdata.append("store_id", process.env.SSLCOMMERZ_STORE_ID);
		this.fdata.append("store_passwd", process.env.SSLCOMMERZ_STORE_PASSWORD);
	}

	// Set the urls
	setUrls(urls) {
		for (let key in urls) {
			this.fdata.append(key, urls[key]);
		}
	}

	// Set order details
	setOrderInfo(orderInfo) {
		for (let key in orderInfo) {
			this.fdata.append(key, orderInfo[key]);
		}
	}

	// Set customer info
	setCustomerInfo(customerInfo) {
		for (let key in customerInfo) {
			this.fdata.append(key, customerInfo[key]);
		}
	}

	// Set shipping info
	setShippingInfo(shippingInfo) {
		for (let key in shippingInfo) {
			this.fdata.append(key, shippingInfo[key]);
		}
	}

	// Set product info
	setProductInfo(productInfo) {
		for (let key in productInfo) {
			this.fdata.append(key, productInfo[key]);
		}
	}

	paymentInit() {
		return fetch(this.URL, {
			method: "POST",
			body: this.fdata,
		}).then((response) => response.json());
	}
};
