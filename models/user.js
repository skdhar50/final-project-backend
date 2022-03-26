const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
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
			maxlength: 1024,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{ timestamps: true }
);

// Generate the json web token for auth user
userSchema.methods.generateToken = function () {
	const token = jwt.sign(
		{ _id: this._id, email: this.email, name: this.name, role: this.role },
		process.env.TOKEN_SECRET,
		{ expiresIn: "7d" }
	);

	return token;
};

module.exports.User = model("User", userSchema);
