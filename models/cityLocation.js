const { Schema, model } = require("mongoose");

module.exports.CityLocation = model(
	"CityLocation",
	Schema(
		{
			name: String,
			upazilla: [String],
		},
		{ timestamps: true }
	)
);
