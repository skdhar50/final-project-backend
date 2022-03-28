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
			address: {
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
		},
		{ timestamps: true }
	)
);
