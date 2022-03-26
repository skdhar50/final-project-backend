const { Schema, model } = require("mongoose");

const ProfileSchema = Schema({});

const Profile = model("profiles", ProfileSchema);

module.exports.Profile = Profile;
