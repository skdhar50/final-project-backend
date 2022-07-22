const { response } = require("express");
const { Qna } = require("../models/qna");

module.exports.getQna = async (req, res) => {
	const questions = await Qna.find({ product: req.params.id }).populate("user");

	return res.status(200).send({ data: questions });
};

module.exports.createQuestion = async (req, res) => {
	const question = new Qna({
		user: req.user._id,
		product: req.params.id,
		question: req.body.question,
	});

	await question.save();
	return res
		.status(200)
		.send({ data: "Question saved successfully", type: "success" });
};
