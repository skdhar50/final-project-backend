const { User } = require("../models/user");
const { Profile } = require("../models/profile");
const upload = require("../middlewares/profileMulter");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

module.exports.signIn = async (req, res) => {
	// Checking if the user is exist
	let user = await User.findOne({ email: req.body.email, status: "active" });
	if (!user) {
		return res
			.status(404)
			.send({ message: "Invalid email or password!", type: "error" });
	}

	// Matching the password
	const validate = await bcrypt.compare(req.body.password, user.password);
	// const validate = req.body.password === user.password;
	if (!validate) {
		return res
			.status(404)
			.send({ message: "Invalid email or password!", type: "error" });
	}

	// Generating the token
	const token = user.generateToken();

	// Sending the response
	return res.status(200).send({
		message: "Login successful",
		data: token,
	});
};

module.exports.getUserProfile = async (req, res) => {
	const profile = await Profile.findOne({ user: req.user._id }).populate(
		"user"
	);

	return res.status(200).send({ data: profile });
};

module.exports.signUp = async (req, res) => {
	let user = await User.findOne({ email: req.body.email });

	if (user) {
		return res.status(400).send({
			message: "User already exists",
			type: "error",
		});
	}

	// Creating User object
	user = new User(_.pick(req.body, ["name", "email", "password"]));

	// Hashing the password
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	// Generating JWT token
	const token = user.generateToken();

	// Saving user data to database
	await user.save();
	const newUser = await User.findOne({ email: user.email });
	const userProfile = new Profile({
		user: newUser._id,
		photo: "userDemo.png",
	});
	await userProfile.save();
	return res.status(200).send({
		message:
			"Registration Successfull!! You can now create your profile from Account Settings!",
		type: "success",
		data: token,
	});
};

module.exports.userProfile = async (req, res) => {
	upload(req, res, async function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(404).send("Invalid files");
		} else if (err) {
			return res.status(500).send("Something went wrong");
		}
		console.log("Successfully created successfully");
		if (req.body.name) {
			await User.updateOne({ _id: req.user._id }, { name: req.body.name });
		}

		let profileData = _.pick(req.body, ["phone", "gender", "birthdate"]);

		if (req.file) {
			profileData.photo = req.file.filename;
		}
		let profile = await Profile.findOne({ user: req.user._id });

		if (profile) {
			await Profile.updateOne({ user: req.user._id }, profileData);
		} else {
			profileData.user = req.user._id;
			let newProfile = new Profile(profileData);
			await newProfile.save();
			return res
				.status(200)
				.send({ message: "Profile created successfully", type: "success" });
		}

		return res
			.status(200)
			.send({ message: "Profile updated successfully", type: "success" });
	});
};

module.exports.changePassword = async (req, res) => {
	let user = await User.findOne({ _id: req.user._id });

	const validate = await bcrypt.compare(
		req.body.currentPassword,
		user.password
	);

	if (!validate) {
		return res
			.status(401)
			.send({ message: "Invalid current password", type: "error" });
	}

	const salt = await bcrypt.genSalt(10);
	hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

	await User.updateOne({ _id: req.user._id }, { password: hashedPassword });

	return res
		.status(200)
		.send({ message: "Password updated successfully", type: "success" });
};

module.exports.forgetPassword = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return res
			.status(404)
			.send({ message: "This email is not registered.", type: "error" });
	}

	const resetToken = jwt.sign(
		{ email: req.body.email },
		process.env.TOKEN_SECRET,
		{ expiresIn: "30m" }
	);

	return res
		.status(200)
		.send({ data: { token: resetToken, user_email: user.email } });
};

module.exports.resetNewPassword = async (req, res) => {
	let user = await User.findOne({ email: req.body.email });

	if (user) {
		const salt = await bcrypt.genSalt(10);
		hashedPassword = await bcrypt.hash(req.body.password, salt);

		await User.updateOne(
			{ email: req.body.email },
			{ password: hashedPassword }
		);

		return res.status(200).send({
			message: "Password changed successfully!",
			type: "success",
		});
	}
};
