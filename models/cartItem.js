const { Schema, model } = require("mongoose");

const CartItemSchema = Schema({});

const CartItem = model("cartItems", CartItemSchema);

module.exports.CartItem = CartItem;
