const { Carousel } = require("../models/carousel");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 20;


function factory() {

    let data = [];
    for (let i = 0; i < numberOfSeed; i++) {
        data.push({
            "title": faker.commerce.productName(),
            "description": faker.lorem.words(10),
            "image_path": faker.image.imageUrl(),
            "link_to": "/" + faker.random.alpha(10),
            "status": faker.random.arrayElement(["active", "inactive"]),
        });
    }



    return data;
}

async function seed() {
    const data = factory();
    // console.log(data);

    Carousel.insertMany(data, (err) => {
        console.log("Seeding: CarouselSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: CarouselSeeder")
            mongoose.disconnect();
        }
    });
}

seed();