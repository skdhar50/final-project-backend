const { Schema, model } = require("mongoose");

module.exports.Deal = model(
    "Deal",
    Schema(
        {
            dealer_id: {
                type: Schema.Types.ObjectId,
                ref: "Dealer",
            },
            deal_value: {
                type: Number,
                required: true,
            },
            products: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    brand: {
                        type: Schema.Types.ObjectId,
                        ref: "Brand",
                    },
                    category: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: "Brand",
                        },
                    ],
                    quantity: {
                        type: Number,
                        required: true,
                    },
                    unit_cost: {
                        type: Number,
                        required: true,
                    },
                }
            ],
            date: {
                type: Date,
                required: true,
            },
            payment_status: {
                type: String,
                enum: ["paid", "unpaid", "risidual"],
                required: true,
            },
            due: {
                type: Number,
                required: true,
            },
        },
        { timestamps: true }
    )
);
