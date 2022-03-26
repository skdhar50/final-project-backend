const { Schema, model } = require("mongoose");

const CategorySchema = Schema({});

const Category = model("categories", CategorySchema);

module.exports.Category = Category;
