const { Schema, model } = require("mongoose");

module.exports.Coupon = model("Coupon", Schema({}, { timestamps: true }));
