const { Review } = require("../models/review");
const path = require("path");
const _ = require("lodash");
const upload = require("../middlewares/reviewMulter");
const multer = require("multer");
const { Profile } = require("../models/profile");

module.exports.isReviewed = async (req, res) => {
	const user = await Review.find({
		product: req.params.product,
		user: req.user._id,
	});

	if (user.length > 0) {
		return res.send({ data: true });
	} else {
		return res.send({ data: false });
	}
};

module.exports.getOverallReating = async (req, res) => {
	const ratings = await Review.find({ product: req.params.product_id }).select({
		rating: 1,
	});

	const sum = ratings.reduce((a, b) => a + parseInt(b.rating), 0);

	return res
		.status(200)
		.send({
			data: {
				average: Math.round(sum / ratings.length),
				total: ratings.length,
			},
		});
};

module.exports.getReviews = async (req, res) => {
	const reviews = await Review.find({ product: req.params.id })
		.sort({ createdAt: -1 })
		.populate("user");
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
	
	let response_object = []
	// await Promise.all(tempReviews.forEach(async (review) => {
	// 	let user_profile = await Profile.find({user: review.user});
		
	// 	response_object.push({
	// 		_id: review._id,
	// 		name: review.user.name,
	// 		profileImage: user_profile[0].photo,
	// 		review: review.review,
	// 		rating: review.rating,
	// 		photos: review.photos,
	// 		createdA: review.createdAt
	// 	})
	// }))

	for(const review of tempReviews) {
		let user_profile = await Profile.find({ user: review.user });

		response_object.push({
			_id: review._id,
			name: review.user.name,
			profileImage: user_profile[0].photo,
			review: review.review,
			rating: review.rating,
			photos: review.photos,
			createdAt: review.createdAt,
		});
	}

	const all_reviews = await Promise.all(response_object)

	//  console.log(all_reviews);

	// tempReviews.map((review) =>
	// 	review?.photos?.forEach((photo, index) =>
	// 		path.resolve(`${path.join(__dirname, "../storages/reviews")}/${photo}`)
	// 	)
	// );


	return res.status(200).send({ data: all_reviews });

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
		return res
			.status(200)
			.send({ message: "Review created successfully!", type: "success" });
	});
};
