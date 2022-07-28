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

dashboard.topCategories = async (req, res) => {
    try {
        let countCategories = {};

        // get orders
        let orders = [];
        if (req.query.year) {
            orders = await Order.find({
                status: 'delivered',
                deliveredAt: { $gte: `${req.query.year}-01-01T00:00:00.000Z`, $lte: `${req.query.year}-12-31T00:00:00.000Z` }
            })
            // .populate('cartItem.product', 'price')
            .populate('cartItem.product', 'category')
            .select({
                "cartItem": 1,
                "discount": 1,
                "status": 1
            });
        } else {
            orders = await Order.find({ status: 'delivered' })
            .populate('cartItem.product', 'price')
            .populate('cartItem.product', 'category')
            .select({
                "cartItem": 1,
                "discount": 1,
                "status": 1
            });
        }
        
        
        // get categories
        orders.forEach(order => {
            order.cartItem.map(item => {
                item.product.category.map(cat => {
                    // console.log(cat)
                    if (countCategories.hasOwnProperty(cat)) {
                        countCategories[cat] += item.count + 1;
                    } else {
                        countCategories[cat] = item.count + 1;
                    }
                    
                })
            })
        })

        const sortedCategory = Object.keys(countCategories)
            .sort(function (a, b) { return countCategories[b] - countCategories[a] })
            .slice(0, 5);
        
        const categories = await Category.find({ _id: { $in: sortedCategory } }).select({ 'name': 1 });

        let graphData = [];
        for (let i = 0; i < sortedCategory.length; i++){
            let catInfo = {};
            catInfo.category = categories.filter(item => {
                if (item._id.toString() === sortedCategory[i]) {
                    return true;
                }
            })[0];
            catInfo.count = countCategories[sortedCategory[i]];
            graphData.push(catInfo);
        }
        
        res.json({
            year: req.query.year?req.query.year:'All',
            data: graphData,
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

dashboard.sellingStatus = async (req, res) => {
    try {
        if (!req.query.year) {
                res.status(422).json({
                message: "Year is required in query parameter!",
                error: true
            })
        }
        let countCategories = {};

        // get orders
        const orders = await Order.find({
                status: 'delivered',
                deliveredAt: { $gte: `${req.query.year}-01-01T00:00:00.000Z`, $lte: `${req.query.year}-12-31T00:00:00.000Z` }
            })
            .populate('cartItem.product', 'price')
            .populate('cartItem.product', 'price')
            .select({
                "cartItem": 1,
                "discount": 1,
                "status": 1,
                "deliveredAt": 1
            });
        
        let sellingStatus = {};
        sellingStatus.january = orderSummaryByMonth(0, orders);
        sellingStatus.february = orderSummaryByMonth(1, orders);
        sellingStatus.march = orderSummaryByMonth(2, orders);
        sellingStatus.april = orderSummaryByMonth(3, orders);
        sellingStatus.may = orderSummaryByMonth(4, orders);
        sellingStatus.june = orderSummaryByMonth(5, orders);
        sellingStatus.july = orderSummaryByMonth(6, orders);
        sellingStatus.august = orderSummaryByMonth(7, orders);
        sellingStatus.september = orderSummaryByMonth(8, orders);
        sellingStatus.october = orderSummaryByMonth(9, orders);
        sellingStatus.november = orderSummaryByMonth(10, orders);
        sellingStatus.december = orderSummaryByMonth(11, orders);

        
        
        
        
        res.json({
            data: sellingStatus,
            message:"Selling status",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

// helper functions 
function orderSummaryByMonth(month, orders) {
    let data = {};
    const filteredOrder = orders.filter(order => {
        if (month === new Date(order.deliveredAt).getMonth()) {
            return true;
        } else return false;
    })

    data.totalOrder = filteredOrder.length;
    let totalProduct = 0;
    let totalSell = 0;
    filteredOrder.forEach(order => {
        
        order.cartItem.forEach(item => {
            totalProduct += item.count;
            totalSell += (item.count * item.product.price);
        })
    })
    data.totalProduct = totalProduct;
    data.totalSell = totalSell;

    return data;
}



module.exports = dashboard;
