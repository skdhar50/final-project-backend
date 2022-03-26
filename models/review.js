const { Schema, model } = require("mongoose");

const ReviewSchema = Schema({});

const Review = model("reviews", ReviewSchema);

module.exports.Review = Review;
