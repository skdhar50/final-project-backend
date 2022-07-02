const { Schema, model } = require("mongoose");

module.exports.Qna = model(
	"Qna",
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
			question: {
				type: String,
				required: true,
			},
			answer: {
				type: String,
			},
			answeredAt: {
				type: Date,
			},
		},
		{ timestamps: true }
	)
);
