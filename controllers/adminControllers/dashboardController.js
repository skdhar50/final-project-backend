const { Brand } = require('../../models/brand');
const { Category } = require('../../models/category');
const { Employee } = require('../../models/employee');
const { Product } = require('../../models/product');
const { Review } = require('../../models/review');
const { User } = require('../../models/user');
const { Order } = require('../../models/order');
const { Deal } = require('../../models/deal');

let dashboard = {};
dashboard.shortSummary = async (req, res) => {
    
    try {
        let data = {};
        data.totalUser = await User.count();
        data.totalBrand = await Brand.count();
        data.totalCategory = await Category.count();
        data.totalEmployee = await Employee.count();
        data.totalPendingOrder = await Employee.find({ status: 'pending' }).count();

        
        // total sale & total revenue
        let orders = await Order.find({ status: 'delivered' })
            .populate('cartItem.product', 'price')
            .select({
                "cartItem": 1,
                "discount": 1,
                "status": 1
            });
        
        let productIds = [];
        // calculating total sales
        data.totalSale = 0;
        orders.forEach(order => {
            let subTotal = 0;
            order.cartItem.forEach(item => {
                subTotal += (item.product.price * item.count)
                if (!productIds.includes(item.product._id)) {
                    productIds.push(item.product._id)
                }
            })
            data.totalSale += subTotal-order.discount
        });

        let saledProducts = await Product
            .find({_id: {$in: productIds}})
            .select({ "unitPrice": 1 });
        
        // calculating total cost of saled products
        let costOfSaledProducts = 0;
        saledProducts.forEach(product => {
            costOfSaledProducts += product.unitPrice;
        })

        data.totalRevenue = data.totalSale - costOfSaledProducts;
        // End total sale & total revenue

        // total cost
        let deals = await Deal.find();
        // calculating total cost 
        data.totalCost = 0;
        deals.forEach(deal => {
            data.totalCost += deal.deal_value;
        })

        
        res.json({
            // totalCost,
            // saledProducts,
            data,
            // productIds,
            message:"Short summary fetched",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

dashboard.stockProducts = async (req, res) => {
    
    try {
        let data = {};
        data.inStock = await Product.find({ quantity: { $gt: 0} }).count();
        data.outOfStock = await Product.find({ quantity: { $eq: 0} }).count();
        data.almostOutOfStock = await Product.find({ quantity: { $lte: 10, $gt: 0} }).count();

        
        res.json({
            data,
            // inStock,
            message:"Short summary fetched",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}





module.exports = dashboard;
