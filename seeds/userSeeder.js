const { User } = require("../models/user");
const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/final-project-db")
	.then(() => console.log("Connected to MongoDB server!!"))
	.catch((err) => console.error("ERROR connecting to MongoDB server!", err));;

const name = [
	"Leland Matthews",
	"Stuart Greene",
	"Tonya Reed",
	"Randolph Snyder",
	"Suzanne Pittman",
	"Dennis Welch",
	"Madeline Pope",
	"Pedro Baker",
	"Mandy Johnston",
	"Bryan Castro",
];
const email = [
	"testAbsorbed011@gmail.com",
	"testBefitting011@gmail.com",
	"testHallowed011@gmail.com",
	"testBetter011@gmail.com",
	"testThinkable011@gmail.com",
	"testLonging011@gmail.com",
	"testErect011@gmail.com",
	"testAlert011@gmail.com",
	"testTowering011@gmail.com",
	"testStaking011@gmail.com",
];

let user = [];

for (let i = 0; i < 10; i++) {
	user.push(new User({
		name: name[i],
		email: email[i],
        password: "12345",
	}));
}

for (let i = 0; i < 10; i++) {
    user[i].save(function(err, res) {
        if(i === 9) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

