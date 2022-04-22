const { Notification } = require("../models/notification");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 3;


function factory() {
    let data = [];
    for (let i = 0; i < numberOfSeed; i++) {
        data.push({
            "title": faker.random.words(3),
            "description": faker.lorem.words(30),
            "type": "public",
            "seen_by": [],
            "status": faker.random.arrayElement(["active", "inactive"]),
        });
    }



    return data;
}

function seed() {
    const data = factory();
    console.log(data);

    Notification.insertMany(data, (err) => {
        console.log("Seeding: NotificationSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: NotificationSeeder")
            mongoose.disconnect();
        }
    });
}

seed();