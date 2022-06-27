const { WishList } = require("../models/wishlist");
const { CartItem } = require("../models/cartItem");

module.exports.getWishlist = async (req, res) => {
	const wishlist = await WishList.find({ user: req.user._id }).populate(
		"products",
		"name description photos"
	);

	return res.status(200).send(wishlist);
};

module.exports.addToWishlist = async (req, res) => {
	let wishlist = await WishList.find({ user: req.user._id });

	if (wishlist.length > 0) {
		const product = await WishList.find({
			user: req.user._id,
			products: req.params.id,
		});

		if (product.length === 0) {
			await WishList.updateOne(
				{ user: req.user._id },
				{ $push: { products: req.params.id } }
			);
			return res.status(200).send("Product added successfully");
		} else {
			return res.status(401).send("Product is already added");
		}
	} else {
		const newWishlist = new WishList({
			user: req.user._id,
			products: req.params.id,
		});

		await newWishlist.save();
		return res.status(200).send("Product added successfully");
	}
};

module.exports.removeFromWishlist = async (req, res) => {
	let wishlist = await WishList.find({
		user: req.user._id,
		products: req.params.id,
	});

	if (wishlist.length > 0) {
		if (wishlist[0].products.length > 1) {
			await WishList.updateOne(
				{ user: req.user._id },
				{ $pull: { products: req.params.id } }
			);
		} else {
			await WishList.deleteOne({ user: req.user._id });
		}
		return res.status(200).send("Product removed successfully");
	} else {
		return res.status(404).send("Product not found");
	}
};

module.exports.moveToCart = async (req, res) => {
	const product = req.params.id;
	const isCartItem = await CartItem.findOne({
		user: req.user._id,
		product: req.params.id,
	});

	console.log(isCartItem);

	if(isCartItem) {
		return res.status(400).send("Item already in cart");
	}

	const cartItem = new CartItem({
		product: req.params.id,
		user: req.user._id,
	});

	await cartItem.save();
	return res.status(200).send("Item moved to cart successfully!");
};
