const { Schema, model } = require("mongoose");

const BrandSchema = Schema({});

const Brand = model("brands", BrandSchema);

module.exports.Brand = Brand;
