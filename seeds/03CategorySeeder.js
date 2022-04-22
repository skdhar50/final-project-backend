// const { faker } = require('@faker-js/faker');
const mongoose = require("./db");
const { Category } = require("../models/category");


const data = [
    {
        "name": "Electronics",
        "status": "active"
    },
    {
        "name": "Computer & Laptop",
        "status": "active"
    },
    {
        "name": "Accessories",
        "status": "active"
    },
    {
        "name": "Smartphone",
        "status": "active"
    },
    {
        "name": "Fashion",
        "status": "active"
    },
]

Category.insertMany(data, (err) => {
    console.log("Seeding: UserSeeder")
    if (err) {
        console.log(err);
        mongoose.disconnect();
    } else {
        console.log("Seeded: UserSeeder")
        mongoose.disconnect();
    }
});



