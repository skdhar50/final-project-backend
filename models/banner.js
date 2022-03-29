const { Schema, model } = require("mongoose");

module.exports.Banner = model("Banner", Schema({
    image_path: {
        type: String,
        required: true,
    },
    link_to: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        enum: ["small", "large"],
        default: "small",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}, { timestamps: true }));
