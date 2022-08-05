const { Schema, model } = require("mongoose");

module.exports.Profile = model(
	"Profile",
	Schema(
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			gender: String,
			phone: String,
			birthdate: Date,
			photo: String,
		},
		{ timestamps: true }
	)
);
