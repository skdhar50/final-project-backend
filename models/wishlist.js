const { Schema, model } = require("mongoose");

module.exports.WishList = model(
    "WishList",
    Schema(
        {
            user: {
                type: Schema.Types.ObjectId,
                    ref: "User",
            },
            products: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                }
            ]
        },
        { timestamps: true }
    )
);
