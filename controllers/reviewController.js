const { Review } = require("../models/review");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const upload = require("../middlewares/multer");
const multer = require("multer");

module.exports.getReviews = async (req, res) => {
	const reviews = await Review.find({ product: req.params.id }).sort({createdAt : -1}).populate(
		"user"
	);
	let tempReviews = reviews.map((review) =>
		_.pick(review, [
			"_id",
			"user",
			"product",
			"review",
			"rating",
			"photos",
			"createdAt",
		])
	);

	tempReviews.map((review) =>
		review?.photos?.forEach((photo, index) =>
			path.resolve(`${path.join(__dirname, "../storages/reviews")}/${photo}`)
		)
	);

	return res.status(200).send(tempReviews);
};

module.exports.postReview = async (req, res) => {
	upload(req, res, async function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(404).send("Invalid files");
		} else if (err) {
			return res.status(500).send("Something went wrong");
		}

		let photos = [];

		req.files.forEach((file) => {
			photos.push(file.filename);
		});

		const review = new Review({
			user: req.user._id,
			product: req.params.id,
			...req.body,
			photos: photos,
		});

		await review.save();
		return res.status(200).send("Review created successfully!");
	});
};
