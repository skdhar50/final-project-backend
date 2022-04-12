const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/final-project-db")
    .then(() => console.log("Connected to MongoDB server!!"))
    .catch((err) => console.error("ERROR connecting to MongoDB server!", err));

module.exports = mongoose;