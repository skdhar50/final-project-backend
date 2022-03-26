const { Schema, model } = require("mongoose");

const OrderSchema = Schema({});

const Order = model("orders", OrderSchema);

module.exports.Order = Order;
