const { Schema, model } = require("mongoose");

module.exports.Brand = model(
	"Brand",
	Schema(
		{
			name: {
				type: String,
				unique: true,
			},
			status: {
				type: String,
				enum: ["active", "inactive"],
				default: "active",
			},
			icon: String,
		},
		{ timestamps: true }
	)
);
