const { Order } = require("../models/order");

let helpers = {};

helpers.totalSale = async (productId) => {
    const orders = await Order.find();
    let count = 0;
    for (i = 0; i < orders.length; i++){
        for (j = 0; j < orders[i].cartItem.length; j++){
            if (orders[i].cartItem[j].product.toString() === productId) {
                count += orders[i].cartItem[j].count;
            }
        }
    }
    return count;

}

module.exports = helpers;