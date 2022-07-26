const { Schema, model } = require("mongoose");

module.exports.Category = model(
	"Category",
	Schema(
		{
			name: {
				type: String,
				unique: true,
			},
			isFeatured: Boolean,
			photo: String,
			parent_id: {
				type: Schema.Types.ObjectId,
				ref: "Category", 
			},
			status: {
				type: String,
				enum: ["active", "inactive"],
				default: "active",
			},
			photo: String,
			isFeatured: {
				type: Boolean,
				default: false
			}
		},
		{ timestamps: true }
	)
);
