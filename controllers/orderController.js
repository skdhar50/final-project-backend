const { Order } = require("../models/order");
const { CartItem } = require("../models/cartItem");
const { ShippingAddress } = require("../models/shippingAddress");



module.exports.placeOrder = async (req, res) => {
	const selectedProducts = await CartItem.find({
		user: req.user._id,
		isSelected: true,
	});
	const selectedShippingAddress = ShippingAddress.findOne({
		user: req.user._id,
		_id: req.body.shipping,
	});
    const paymentMethod = req.body.paymentMethod;

    const newOrder = new Order({
        CartItem: selectedProducts,
        address: {...selectedShippingAddress},
        payment_method: paymentMethod,
        user: req.user._id,
        discount: req.body.discount
    })

    await newOrder.save();
    await CartItem.deleteMany(selectedProducts);

    return res.status(200).send("Order created successfully");
};
