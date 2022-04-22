const { CartItem } = require('../../models/cartItem');
const { User } = require('../../models/user');

let cart = {}

cart.cartUsers = async (req, res) => {
    try {
        const carts = await CartItem.distinct('user')
        let users = [];
        for (let i = 0; i < carts.length; i++){
            const user = await User.findById(carts[i]);
            if(user) users.push(user);
        }
        res.json({
            data: {
                cartUsers: users,
            },
            message: "Suceesfully retrived!",
            error: false
        })
        
        
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
cart.cartItemsByUser = async (req, res) => {
    const items = await CartItem.find({ "user": req.params.cus_id }).populate('product', '_id name price');
    try {
        res.json({
            data: {
                items: items,
            },
            message: "Suceesfully retrived!",
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
cart.removeItem = async (req, res) => {
    try {
        res.json({
            data: {
                item: await CartItem.findByIdAndDelete(req.params.id),
            },
            message: "Carousel was deleted suceesfully!",
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

module.exports = cart;