const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	let token = req.header("Authorization");

	if (!token) {
		return res.status(401).send("Unauthorized");
	}

	token = token.split(" ")[1].trim();
	const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);

	if (!decoded) {
		return res.status(401).send("Unauthorized");
	}

	req.user = decoded;
	next();
};
