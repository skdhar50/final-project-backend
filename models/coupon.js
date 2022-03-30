const { Schema, model } = require("mongoose");

module.exports.Coupon = model(
    "Coupon",
    Schema(
        {
            code: {
                type: String,
                required: true,
            },
            start_form: {
                type: Date,
                required: true,
            },
            expired_in: {
                type: Date,
                required: true,
            },
            discounted_amount: {
                type: Number,
                required: true,
            },
            offer_limit: {
                type: Number,
                required: true,
            },
            min_shopping_amount: {
                type: Number,
                required: true,
            },
            categories: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Category",
                },
            ],
            brands: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Brand",
                },
            ],
            products: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                },
            ],
            users: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            status: {
                type: String,
                enum: ["active", "inactive"],
                default: "active",
            },
        },
        { timestamps: true }
    )
);
