const { Schema, model } = require("mongoose");

module.exports.ShippingAddress = model(
	"ShippingAddress",
	Schema(
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			name: { type: String, required: true },
			phone: { type: String, required: true },
			phone2: { type: String },
			city: { type: String, required: true },
			area: { type: String, required: true },
			zone: { type: String },
			fullAddress: { type: String, required: true },
		},
		{ timestamps: true }
	)
);
