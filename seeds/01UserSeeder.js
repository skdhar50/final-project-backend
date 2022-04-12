const { User } = require("../models/user");
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const mongoose = require("./db");

const numberOfSeed = 10;



async function factory() {

    let data = [];

    for (let i = 1; i <= numberOfSeed; i++) {

        const name = faker.name.findName();
        const email = faker.internet.email();
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash("123456", salt);

        data.push({
            "name": name,
            "email": email,
            "password": password
        });
    }

    return data;
}

async function seed() {
    const data = await factory();
    User.insertMany(data, (err) => {
        console.log("Seeding: UserSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: UserSeeder")
            mongoose.disconnect();
        }
    });
}
seed();



