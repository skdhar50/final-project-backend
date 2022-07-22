const { User } = require("../models/user");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");
const bcrypt = require("bcrypt");

const numberOfSeed = 10;

function factory() {

    let data = [];

    for (let i = 1; i <= numberOfSeed; i++) {

        let name = faker.name.findName();
        let email = faker.internet.email();
        
        let password = "12345678";

        data.push({
            "name": name,
            "email": email,
            "password": password
        });
    }

    return data;
}


User.insertMany(factory(), (err) => {
    console.log("Seeding: UserSeeder")
    if (err) {
        console.log('There was a server side error!');
        mongoose.disconnect();
    } else {
        console.log("Seeded: UserSeeder")
        mongoose.disconnect();
    }
});



