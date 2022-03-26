const { Schema, model } = require("mongoose");

const CarouselSchema = Schema({});

const Carousel = model("carousels", CarouselSchema);

module.exports.Carousel = Carousel;
