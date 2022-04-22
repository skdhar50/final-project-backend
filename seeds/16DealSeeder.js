const { Dealer } = require("../models/dealer");
const { Deal } = require("../models/deal");
const { Brand } = require("../models/brand");
const { Category } = require("../models/category");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 30;


async function factory() {

    const dealers = await Dealer.find();
    const brands = await Brand.find();
    const Categories = await Category.find();
    

    let data = [];
    for (let i = 0; i < numberOfSeed; i++) {
        data.push({
            "dealer": faker.random.arrayElement(dealers)._id,
            "deal_value": faker.datatype.number({ min: 100000, max: 500000 }),
            "products": [
                {
                    "name": faker.commerce.productName(),
                    "brand": faker.random.arrayElement(brands)._id,
                    "category": [
                        faker.random.arrayElement(Categories)._id,
                        faker.random.arrayElement(Categories)._id
                    ],
                    "quantity": faker.datatype.number({ min: 50, max: 300 }),
                    "unit_cost": faker.datatype.number({ min: 500, max: 3000 }),
                },
                {
                    "name": faker.commerce.productName(),
                    "brand": faker.random.arrayElement(brands)._id,
                    "category": [
                        faker.random.arrayElement(Categories)._id
                    ],
                    "quantity": faker.datatype.number({ min: 50, max: 300 }),
                    "unit_cost": faker.datatype.number({ min: 500, max: 3000 }),
                },
                {
                    "name": faker.commerce.productName(),
                    "brand": faker.random.arrayElement(brands)._id,
                    "category": [
                        faker.random.arrayElement(Categories)._id,
                        faker.random.arrayElement(Categories)._id
                    ],
                    "quantity": faker.datatype.number({ min: 50, max: 300 }),
                    "unit_cost": faker.datatype.number({ min: 500, max: 3000 }),
                }
            ],
            "date": faker.date.recent(5),
            "payment_status": "paid",
            "due": 0,
            "status": faker.random.arrayElement(["active", "inactive"])


        });
    }



    return data;
}

async function seed() {
    const data = await factory();
    // console.log(data);

    Deal.insertMany(data, (err) => {
        console.log("Seeding: DealSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: DealSeeder")
            mongoose.disconnect();
        }
    });
}

seed();