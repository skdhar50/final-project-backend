const { Schema, model } = require("mongoose");

const CouponSchema = Schema({});

const Coupon = model("coupons", CouponSchema);

module.exports.Coupon = Coupon;
