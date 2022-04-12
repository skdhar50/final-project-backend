const { Coupon } = require("../models/coupon");
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
            "code": faker.random.alphaNumeric(10),
            "start_form": faker.date.between('2022-04-01T00:00:00.000Z', '2022-05-01T00:00:00.000Z'),
            "expired_in": faker.date.between('2022-06-01T00:00:00.000Z', '2022-09-01T00:00:00.000Z'),
            "discounted_amount": faker.datatype.number({ min: 200, max: 500 }),
            "offer_limit": "",
            "min_shopping_amount": faker.datatype.number({ min: 1000, max: 5000 }),
            "categories": [categories[0]._id],
            "brands": [],
            "products": [],
            "users": [],
            "status": faker.random.arrayElement(["active", "inactive"]),
        });
    }



    return data;
}

async function seed() {
    const data = await factory();
    // console.log(data);

    Coupon.insertMany(data, (err) => {
        console.log("Seeding: CouponSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: CouponSeeder")
            mongoose.disconnect();
        }
    });
}

seed();