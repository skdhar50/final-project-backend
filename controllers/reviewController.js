const { Review } = require("../models/review");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

module.exports.getReviews = async (req, res) => {
	const reviews = await Review.find({ product: req.params.id }).populate(
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

	if (tempReviews.length > 0) {
		console.log(tempReviews);
	}

	return res.status(200).send(reviews);
};

module.exports.postReview = async (req, res) => {
	const form = new formidable.IncomingForm();

	form.keepExtensions = true;
	form.multiples = true;
	form.maxFieldsSize = 10 * 1024 * 1024;
	form.uploadDir = __dirname + "/../storages/reviews";

	let photos = [];
	let inputData = {};

	form
		.on("error", function (err) {
			throw err;
		})
		.on("field", function (field, value) {
			// console.log(field, value);
			inputData = {
				...inputData,
				[field]: value,
			};
		})
		/* this is where the renaming happens */
		.on("fileBegin", function (name, file) {
			//rename the incoming file to the file's name
			file.filepath =
				form.uploadDir +
				"/" +
				file.newFilename +
				"." +
				file.mimetype.split("/")[1];

			photos.push(file.newFilename + "." + file.mimetype.split("/")[1]);
		})
		.on("file", function (field, file) {
			//On file received
		})
		.on("progress", function (bytesReceived, bytesExpected) {
			//self.emit('progess', bytesReceived, bytesExpected)
			// var percent = ((bytesReceived / bytesExpected) * 100) | 0;
			// process.stdout.write("Uploading: %" + percent + "\r");
		})
		.on("end", async function () {
			inputData = {
				...inputData,
				photos: photos,
			};
			console.log(inputData);

			const review = new Review({
				user: req.user._id,
				product: req.params.id,
				...inputData,
			});
			await review.save();

			return res.status(200).send("Review saved successfully");
		});

	form.parse(req);
};

module.exports.getReviewImage = async (req, res) => {
	const imagePath = path.resolve(
		`${path.join(__dirname, "..storages/reviews")}/${req.params.name}`
	);
	const fileCheck = fs.existsSync(filePath);

	if (fileCheck) {
		return res.status(200).send(imagePath);
	} else {
		return res.status(404).send("No image found");
	}
};
