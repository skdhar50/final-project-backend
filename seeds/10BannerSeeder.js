const { Banner } = require("../models/banner");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 20;


function factory() {

    let data = [];
    for (let i = 0; i < numberOfSeed; i++) {
        data.push({
            "image_path": faker.image.imageUrl(),
            "link_to": "/" + faker.random.alpha(10),
            "size": faker.random.arrayElement(["small", "large"]),
            "status": faker.random.arrayElement(["active", "inactive"]),
        });
    }



    return data;
}

async function seed() {
    const data = factory();
    // console.log(data);

    Banner.insertMany(data, (err) => {
        console.log("Seeding: BannerSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: BannerSeeder")
            mongoose.disconnect();
        }
    });
}

seed();