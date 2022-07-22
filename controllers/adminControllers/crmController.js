const { Order } = require('../../models/order');
const { CityLocation } = require('../../models/cityLocation');
const { Product } = require('../../models/product');

let crm = {};

crm.locations = async (req, res) => {
    try {
        const locations = await CityLocation
            .find();
        
        res.json({
            data: {
                locations,
            },
            message: "Suceesfully retrieved!",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

crm.productsByArea = async (req, res) => {
    try {
        const orders = await Order
            .find({_id: {$in: req.body.ids}})
            .select({ "cartItem":  1});
        
        let productCount = {};
        let productIds = [];
        for (let i = 0; i < orders.length; i++){
            for (let j = 0; j < orders[i].cartItem.length; j++){
                const item = orders[i].cartItem[j];
                if (productCount.hasOwnProperty(item.product)) {
                    productCount[item.product] = productCount[item.product] + item.count; 
                } else {
                    productCount[item.product] = item.count; 
                    productIds.push(item.product)
                }
            }
        }

        let products = await Product
            .find({ _id: { $in: productIds } });
        for (let i = 0; i < products.length; i++){
            products[i]._doc.count = productCount[products[i]._id];
        }
        let sortedProducts = products.sort((a,b)=> (a._doc.count < b._doc.count ? 1 : -1));
        
        res.json({
            data: {
                products: sortedProducts,
            },
            message: "Suceesfully retrieved!",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

module.exports = crm;