const { CartItem } = require("../models/cartItem");
const { Order } = require("../models/order");
// const { Product } = require("../../models/product");
const { faker } = require('@faker-js/faker');
const mongoose = require("./db");

const numberOfSeed = 1;


async function factory() {

    const items = await CartItem.distinct('user');
    let orders = [];
    for (let i = 0; i < numberOfSeed; i++){
        let products = await CartItem.find({ "user": items[i] });
        
        
        orders.push({
            "order_id": faker.random.alphaNumeric(10).toUpperCase(),
            "cartItem": [...products],
            "transaction_id": faker.random.alphaNumeric(12),
            "address": {
                "phone": faker.phone.phoneNumber(),
                "address1": faker.address.streetAddress(),
                "address2": faker.address.secondaryAddress(),
                "city": faker.random.arrayElement(["Chittagong","Chittagong","Chittagong","Chittagong", "Dhaka","Sylhet"]),
                "state": faker.address.state(),
                "postalCode": faker.address.zipCode(),
                "country": faker.address.country(),
                
            },
            "paymentStatus": faker.random.arrayElement(["pending", "complete"]),
            "paymentMethod": faker.random.arrayElement(["cod", "card", "bkash", "rocket"]),
            "user": items[i],
            "call_status": faker.random.arrayElement(["no_call", "one_time", "two_time", "three_time", "received_confirm", "received_cancell"]),
            "discount": 0,
            "status": faker.random.arrayElement([
                "pending",
                "processing",
                "shipped",
                "delivered",
                "returned",
                "cancelled",
            ]),
            "last_call": "",
        });
    }
    

    return [...orders];
}

async function seed() {
    const data = await factory();
    // console.log(data[0]);

    Order.insertMany(data, (err) => {
        console.log("Seeding: OrderSeeder")
        if (err) {
            console.log(err);
            mongoose.disconnect();
        } else {
            console.log("Seeded: OrderSeeder")
            mongoose.disconnect();
        }
    });
}

seed();


