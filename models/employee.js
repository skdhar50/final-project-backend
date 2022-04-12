const { Schema, model } = require("mongoose");

module.exports.Employee = model("Employee", Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    nid: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    joining_date: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum:["support", "manager", "guard", "delivery_man", "general"],
    },
    shift: {
        type: String,
        required: true,
        enum: ["day", "night"],
    },
    salary: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}, { timestamps: true }));
