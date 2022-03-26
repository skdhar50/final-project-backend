const { Schema, model } = require("mongoose");

const ProductSchema = Schema({});

const Product = model("products", ProductSchema);

module.exports.Product = Product;
