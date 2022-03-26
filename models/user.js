const { Schema, model } = require("mongoose");

const UserSchema = Schema({});

const User = model("users", UserSchema);

module.exports.User = User;
