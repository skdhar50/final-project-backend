const { Dealer } = require("../models/dealer");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 10;


function factory() {

    let data = [];
    for (let i = 0; i < numberOfSeed; i++) {
        data.push({
            "name": faker.name.findName(),
            "company": faker.company.companyName(),
            "email": faker.internet.email(),
            "phone": faker.phone.phoneNumber(),
            "address": faker.address.streetAddress() + ", " + faker.address.cityName(),
            "products": faker.random.arrayElement([["Computer", "Smartphone", "SmartWatch"], ["Cloth", "Shirt", "Panjabi"]]),
            "status": faker.random.arrayElement(["active", "inactive"])


        });
    }



    return data;
}

async function seed() {
    const data = factory();
    // console.log(data);

    Dealer.insertMany(data, (err) => {
        console.log("Seeding: DealerSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: DealerSeeder")
            mongoose.disconnect();
        }
    });
}

seed();