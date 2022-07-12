module.exports = (err, req, res, next) => {
	return res
		.status(500)
		.send({
			message: "Something went wrong. Please try again later!",
			type: "error",
		});
};
