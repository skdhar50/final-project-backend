const { User } = require("../models/user");
const { Profile } = require("../models/profile");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 10;


async function factory() {

    const usersData = await User.find();
    let data = []

    for (let i = 0; i < numberOfSeed; i++) {

        data.push({
            "user": usersData[i]._id,
            "phone": faker.phone.phoneNumber(),
            "gender": "male",
            "birthDate": "1990-10-10",
            "photo": faker.image.imageUrl(),
        });
    }

    return data;
}

async function seed() {
    const data = await factory();

    Profile.insertMany(data, (err) => {
        console.log("Seeding: ProfileSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: ProfileSeeder")
            mongoose.disconnect();
        }
    });
}

seed();


