// const { faker } = require('@faker-js/faker');
const mongoose = require("./db");
const { Brand } = require("../models/brand");


const data = [
    {
        "name": "Samsung",
        "status": "active"
    },
    {
        "name": "Apple",
        "status": "active"
    },
    {
        "name": "Huawei",
        "status": "active"
    },
    {
        "name": "Nike",
        "status": "active"
    },
    {
        "name": "Adidas",
        "status": "active"
    },
    {
        "name": "HP",
        "status": "active"
    },
    {
        "name": "Dell",
        "status": "active"
    },
    {
        "name": "Microsoft",
        "status": "active"
    },
    {
        "name": "Walton",
        "status": "active"
    },
    {
        "name": "No Brand",
        "status": "active"
    },
]

Brand.insertMany(data, (err) => {
    console.log("Seeding: BrandSeeder")
    if (err) {
        console.log(err);
        mongoose.disconnect();
    } else {
        console.log("Seeded: BrandSeeder")
        mongoose.disconnect();
    }
});



