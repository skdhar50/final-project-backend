const { Schema, model } = require("mongoose");

module.exports.User = model(
	"User",
	Schema(
		{
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
				unique: true,
			},
			password: {
				type: String,
			},
			role: {
				type: String,
				enum: ["admin", "user"],
				default: "user",
			},
		},
		{ timestamps: true }
	)
);
