const { User } = require("../models/user");

module.exports.signIn = async (req, res) => {
	// Checking if the user is exist
	let user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res
			.status(404)
			.send({ message: "Invalid email or password!", type: "error" });
	}

	// Matching the password
	// const validate = bcrypt.compare(req.body.password, user.password);
	const validate = req.body.password === user.password;
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
