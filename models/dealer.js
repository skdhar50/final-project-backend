const { Schema, model } = require("mongoose");

module.exports.Dealer = model(
    "Dealer",
    Schema(
        {
            name: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                trim: true,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            products: [
                {
                    type: String,
                    required: true,
                }
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
