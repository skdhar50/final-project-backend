const { Schema, model } = require("mongoose");

module.exports.Product = model(
	"Product",
	Schema(
		{
			name: String,
			price: Number,
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
			photos: [String],
			unitPrice: Number,
			size: String,
			color: String,
			weight: String,
			status:{
				type: String,
				enum: ["active", "inactive", "discontinued"],
				default: "active",
			},
		},
		{ timestamps: true }
	)
);
