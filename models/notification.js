const { Schema, model } = require("mongoose");

module.exports.Notification = model(
    "Notification",
    Schema(
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            product_id: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        },
        { timestamps: true }
    )
);
