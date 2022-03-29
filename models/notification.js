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
            type: {
                type: String,
                enum: ["individual", "public"],
                required: true,
            },
            notify_for: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            seen_by: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            status: {
                type: String,
                enum: ["draft", "active", "inactive"],
                default: "draft",
            },
        },
        { timestamps: true }
    )
);
