const { Notification } = require("../models/notification");
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

	const notification = new Notification({
		title: `Question Created by ${req.user.name}`,
		description: `Hey Admin! ${req.user.name} has recently asked a new question! Let a look at that!`,
		product_id: req.params.id,
	});

	await notification.save();
	console.log(`Question created successfully`);
	await question.save();

	return res
		.status(200)
		.send({ data: "Question created successfully", type: "success" });
};
