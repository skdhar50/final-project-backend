const { Schema, model } = require("mongoose");

module.exports.Review = model(
	"Review",
	Schema(
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			product: {
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
			review: String,
			rating: String,
			photos: [String]
		},
		{ timestamps: true }
	)
);
