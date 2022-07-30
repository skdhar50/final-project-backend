const { Order } = require('../../models/order');
const { Product } = require('../../models/product');
const { notificationMaker } = require('../../utilities/notification');

let order = {};

order.orderList = async (req, res) => {
    try {
        const orders = await Order
            .find()
            .select({ "cartItem":  0})
            .populate('user', 'name email')
            .sort({ _id: -1 });
        
        res.json({
            data: {
                orders,
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
order.showOrder = async (req, res) => {
    try {
        const order = await Order
            .findById(req.params.id)
            .populate('user', 'name email')
            .populate('cartItem.product', 'name price photos color size');
        res.json({
            data: {
                order,
            },
            message: "Successfully retrieved",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
order.updateOrder = async (req, res) => {
    try {
        if (req.body.hasOwnProperty('call_status')) {
            req.body.last_call = Date.now();
        }
        if (req.body.hasOwnProperty('status')) { 
            const tempOrder = await Order.findById(req.params.id);
            let statusDates = tempOrder.statusDates;
            if (req.body.status === "processing") {
                statusDates.processing = new Date(); 
                req.body.statusDates = statusDates;
            } else if (req.body.status === "shipped") {
                statusDates.shipped = new Date(); 
                req.body.statusDates = statusDates;
            } else if (req.body.status === "delivered") {
                statusDates.delivered = new Date(); 
                req.body.statusDates = statusDates;
            } else if (req.body.status === "returned") {
                statusDates.returned = new Date(); 
                req.body.statusDates = statusDates;
            } else if (req.body.status === "cancelled") {
                statusDates.cancelled = new Date(); 
                req.body.statusDates = statusDates;
            } 
        }
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            // { new: true }
        );
        if (req.body.hasOwnProperty('status')) {

            if (req.body.status === "delivered") {
                
                order.cartItem.forEach(async item => {
                    const product = await Product.findOneAndUpdate( {_id: item.product}, 
                        {$inc : {'totalSell' : item.count}}, 
                        { new: true }
                    );
                    
                });
            } else if (order.status === "delivered" && req.body.status !== "delivered") {
                order.cartItem.forEach(async item => {
                    const product = await Product.findOneAndUpdate( {_id: item.product}, 
                        {$inc : {'totalSell' : -item.count}}, 
                        { new: true }
                    );
                    
                });
            }
            notificationMaker(
                'Order Status Changed',
                'Your order: #'+order._id+' changed to '+req.body.status,
                'individual',
                [order.user],
                'active'
            );
        }
        res.json({
            data: {
                order,
            },
            message: "Order was updated suceesfully!",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
order.removeOrder = async (req, res) => {
    try {
        res.json({
            data: {
                order: await Order.findByIdAndDelete(req.params.id),
            },
            message: "Order was deleted suceesfully!",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

module.exports = order;