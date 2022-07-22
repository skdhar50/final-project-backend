const { Schema, model } = require("mongoose");

module.exports.Product = model(
	"Product",
	Schema(
		{
			name: String,
			price: Number,
			shortDescription: String,
			description: String,
			category: [
				{
					type: Schema.Types.ObjectId,
					ref: "Category",
				},
			],
			brand: {
				type: Schema.Types.ObjectId,
				ref: "Brand",
			},
			quantity: Number,
			totalSell: Number,
			photos: [String],
			unitPrice: Number,
			size: String,
			color: String,
			weight: String,
			isExclusive: Boolean,
			status: {
				type: String,
				enum: ["active", "inactive", "discontinued"],
				default: "active",
			},
		},
		{ timestamps: true }
	)
);
