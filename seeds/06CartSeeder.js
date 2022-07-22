const { CartItem } = require("../models/cartItem");
const { User } = require("../models/user");
const { Product } = require("../models/product");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 10;


async function factory() {

    const users = await User.find({
        role: 'user'
    }).limit(10);
    const products = await Product.find();
    let data = []

    for (let i = 0; i < numberOfSeed; i++) {

        data.push({
            "product": faker.random.arrayElement(products)._id,
            "count": faker.random.arrayElement([1, 2, 3, 4, 5]),
            // "user": faker.random.arrayElement(users)._id,
            "user": users[1]._id,
        });
    }

    return data;
}

async function seed() {
    const data = await factory();
    // console.log(data);

    CartItem.insertMany(data, (err) => {
        console.log("Seeding: CartSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: CartSeeder")
            mongoose.disconnect();
        }
    });
}

seed();


