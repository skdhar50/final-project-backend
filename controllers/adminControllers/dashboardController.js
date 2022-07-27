const { Brand } = require('../../models/brand');
const { Category } = require('../../models/category');
const { Employee } = require('../../models/employee');
const { Product } = require('../../models/product');
const { Review } = require('../../models/review');
const { User } = require('../../models/user');
const { Order } = require('../../models/order');

let dashboard = {};
dashboard.shortSummary = async (req, res) => {
    
    try {
        let data = {};
        // data.totalUser = await User.count();
        // data.totalBrand = await Brand.count();
        // data.totalCategory = await Category.count();
        // data.totalEmployee = await Employee.count();
        // calculating total sales
        let orders = await Order.find({ status: 'delivered' })
            .populate('cartItem.product', 'price')
            .select({
                "cartItem": 1,
                "discount": 1,
                "status": 1
            });
        let totalSale = 0;
        orders.forEach(order => {
            let subTotal = 0;
            order.cartItem.forEach(item => {
                subTotal += item.product.price * item.count
            })
            subTotal = subTotal-order.discount
        });
        
        res.json({
            // data,
            orders: orders,
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
