const { Schema, model } = require("mongoose");
const { CartItemSchema } = require("./cartItem");

module.exports.Order = model(
	"Order",
	Schema(
		{
			cartItem: [CartItemSchema],
			transaction_id: {
				type: String,
				unique: true,
			},
			order_id: String,
			address: {
				name: {
					type: String,
					required: true,
				},
				phone: {
					type: String,
					required: true,
				},
				address1: {
					type: String,
					required: true,
				},
				address2: {
					type: String,
					required: true,
				},
				city: {
					type: String,
					required: true,
				},
				state: {
					type: String,
				},
				postalCode: {
					type: String,
					required: true,
				},
				country: {
					type: String,
					required: true,
				},
			},

			paymentStatus: {
				type: String,
				enum: ["pending", "complete"],
				default: "pending",
			},
			payment_method: {
				type: String,
				enum: ["cod", "card", "bkash", "rocket"],
				default: "cod",
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			status: {
				type: String,
				enum: [
					"pending",
					"processing",
					"shipped",
					"delivered",
					"returned",
					"cancelled",
				],
				default: "pending",
			},
			call_status: {
				type: String,
				enum: ["no_call", "one_time", "two_time", "three_time"],
				default: "no_call",
			},
			discount: Number,
			sessionKey: String,
		},
		{ timestamps: true }
	)
);
