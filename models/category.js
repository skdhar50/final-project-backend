const { Schema, model } = require("mongoose");

module.exports.Category = model(
	"Category",
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
		},
		{ timestamps: true }
	)
);
