const { Employee } = require("../models/employee");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 20;


function factory() {

    let data = [];
    for (let i = 0; i < numberOfSeed; i++) {
        data.push({
            "name": faker.name.findName(),
            "email": faker.internet.email(),
            "phone": faker.phone.phoneNumber(),
            "nid": faker.datatype.number(9999999999),
            "address": faker.address.streetAddress() +", "+ faker.address.cityName(),
            "joining_date": faker.date.past(2),
            "type": faker.random.arrayElement(["support", "manager", "guard", "delivery_man", "general"]),
            "shift": faker.random.arrayElement(["day", "night"]),
            "salary": faker.datatype.number({ min: 10000, max: 30000 }),
            "status": faker.random.arrayElement(["active", "inactive"])


        });
    }



    return data;
}

async function seed() {
    const data = factory();
    // console.log(data);

    Employee.insertMany(data, (err) => {
        console.log("Seeding: EmployeeSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: EmployeeSeeder")
            mongoose.disconnect();
        }
    });
}

seed();