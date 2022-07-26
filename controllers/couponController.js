const { Coupon } = require("../models/coupon");
const { CartItem } = require("../models/cartItem");

module.exports.getCoupon = async (req, res) => {
	const coupon = await Coupon.find({ code: req.body.coupon });

	// Checking if coupon is available
	if (coupon === undefined) {
		return res
			.status(404)
			.send({ message: "Coupon is not available!", type: "error" });
	} else {
		// Checking if coupon is expired or inactive
		if (
			new Date().getTime() >= coupon.start_from.getTime() &&
			new Date().getTime() < coupon.expired_in.getTime() &&
			coupon.status === "active"
		) {
			// If the coupon is not expired
			// Checking if minimum shopping amount is okay
			if (req.body.amount >= coupon.min_shopping_amount) {
				// If shopping amount is okay
				if (coupon.users.length > 0) {
					const user = coupon.users.filter((user) => user._id === req.user._id);

					// Checking if the user is eligible for the coupon
					if (user.length === 0) {
						// If user is not eligible for the coupon
						return res.status(400).send({
							message: "You are not eligible for this coupon.",
							type: "error",
						});
					} else {
						// If user is eligible for the coupon
						// Checking if the user already used the coupon
						const already_used = coupon.appliers.filter(
							(user) => user._id === req.user._id
						);

						if (already_used.length > 0) {
							// If the user already used the coupon
							return res.status(400).send({
								message: "You already used the coupon.",
								typeof: "error",
							});
						} else {
							// If the user not already used the coupon
							let products = await CartItem.find({
								isSelected: true,
								user: req.user._id,
							})
								.populate("product")
								.select({ "product.unitPrice": 1, count: 1, "product._id": 1 });
							
							let total_amount = req.body.amount;

							// Checking when the coupon is valid for some products
							if(coupon.products.length > 0) {
								let temp = [];
								products.forEach((product) => {
									let eligable = coupon.product.find(
										(item) => item._id === product._id
									);

									if (eligable !== undefined) {
										temp.push(eligable);
									}
								});

								// Checking the shopping amount of eligible products
								if (temp.length > 0) {
									total_amount = temp.reduce(
										(total, product) =>
											total + product.unitPrice * product.count,
										0
									);
								}
							}

							// Checking the shopping amount of eligible products
							// if (products) {
							// 	total_amount = products.reduce(
							// 		(total, product) => total + product.unitPrice * product.count,
							// 		0
							// 	);
							// }

							if (total_amount < coupon.min_shopping_amount) {
								// If minimum amount is less then required
								return res.status(400).send({
									message:
										"Minimum shopping amount of eligible products should be " +
										coupon.min_shopping_amount,
									type: "error",
								});
							} else {
								// Otherwise
								return res
									.status(200)
									.send({
										data: coupon.discounted_amount,
										message: "Coupon applied successfully!",
										type: "success",
									});
							}
						}
					}
				}
			} else {
				// If shopping amount is not okay
				return res.status(400).send({
					message:
						"Minimum shopping amount should be " + coupon.min_shopping_amount,
					type: "error",
				});
			}
		} else {
			// If coupon is expired or inactive
			return res.status(200).send({ message: "Coupon expired", type: "error" });
		}
	}
};
