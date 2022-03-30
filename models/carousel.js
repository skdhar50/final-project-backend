const { Schema, model } = require("mongoose");

module.exports.Carousel = model("Carousel", Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_path: {
        type: String,
        required: true,
    },
    link_to: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}, { timestamps: true }));
