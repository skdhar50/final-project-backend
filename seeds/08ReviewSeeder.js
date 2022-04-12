const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Review } = require("../models/review");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 20;


async function factory() {

    const users = await User.find().limit(numberOfSeed);
    const products = await Product.find().limit(numberOfSeed);
    let data = [];
    for (let i = 0; i < numberOfSeed; i++){
        data.push({
            "user": faker.random.arrayElement(users)._id,
            "product": faker.random.arrayElement(products)._id,
            "review": faker.lorem.words(50),
            "rating": faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
        });
    }
    


    return data;
}

async function seed() {
    const data = await factory();
    // console.log(data);

    Review.insertMany(data, (err) => {
        console.log("Seeding: ReviewSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: ReviewSeeder")
            mongoose.disconnect();
        }
    });
}

seed();