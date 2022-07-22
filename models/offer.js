const { Schema, model } = require("mongoose");

module.exports.Offer = model(
	"Offer",
	Schema(
		{
			name: String,
			startDate: Date,
			endDate: Date,
			description: String,
			discountAmount: Number,
			limit: Number,
			status: {
				type: String,
				enum: ["active", "inactive"],
				default: "active",
			},
			photo: String,
			products: [
				{
					type: Schema.Types.ObjectId,
					ref: "Product", // products to product
				},
			],
		},
		{ timestamps: true }
	)
);
