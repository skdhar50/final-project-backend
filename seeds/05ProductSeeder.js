const { faker } = require('@faker-js/faker');
const mongoose = require("./db");
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const { Brand } = require("../models/brand");

const numberOfSeed = 100;


async function factory() {

    const categories = await Category.find();
    const brands = await Brand.find();
    let data = []

    for (let i = 0; i < numberOfSeed; i++) {

        data.push({
            "name": faker.commerce.productName(),
            "price": faker.commerce.price(200, 2000),
            "shortDescription": faker.commerce.productDescription(), 
            "description": faker.commerce.productDescription(),
            "category": [
                faker.random.arrayElement(categories)._id,
                faker.random.arrayElement(categories)._id
            ],
            "brand": faker.random.arrayElement(brands)._id,
            "quantity": faker.random.arrayElement([50, 100, 150, 130]),
            "totalSell": 0,
            "photos": [faker.image.imageUrl()],
            "unitPrice": faker.commerce.price(150, 199),
            "color": "",
            "weight": "",
            "height": "",
            "isExclusive": false,
        });
    }

    return data;
}

async function seed() {
    const data = await factory();
    // console.log(data);
    Product.insertMany(data, (err) => {
        console.log("Seeding: ProductSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: ProductSeeder")
            mongoose.disconnect();
        }
    });
}

seed();



