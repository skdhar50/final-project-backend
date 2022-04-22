const { Offer } = require("../models/offer");
const { Category } = require("../models/category");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 3;


async function factory() {
    const categories = await Category.find();
    console.log(categories);
    let data = [];
    for (let i = 0; i < numberOfSeed; i++) {
        data.push({
            "name": faker.random.words(3),
            "startDate": faker.date.between('2022-04-01T00:00:00.000Z', '2022-05-01T00:00:00.000Z'),
            "endDate": faker.date.between('2022-06-01T00:00:00.000Z', '2022-09-01T00:00:00.000Z'),
            "description": faker.lorem.words(15),
            "discountAmount": faker.datatype.number({ min: 200, max: 500 }),
            "limit": faker.datatype.number({ min: 1000, max: 5000 }),
            "category": [categories[0]._id],
            "brand": [],
            "products": [],
            "status": faker.random.arrayElement(["active", "inactive"]),
        });
    }



    return data;
}

async function seed() {
    const data = await factory();
    console.log(data);

    Offer.insertMany(data, (err) => {
        console.log("Seeding: OfferSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: OfferSeeder")
            mongoose.disconnect();
        }
    });
}

seed();