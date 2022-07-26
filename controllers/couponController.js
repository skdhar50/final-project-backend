const { Coupon } = require("../models/coupon");
const { CartItem } = require("../models/cartItem");

module.exports.getCoupon = async (req, res) => {
	const coupon = await Coupon.find({ code: req.body.coupon });

	// Checking if coupon is available
	if (coupon.length === 0) {
		return res
			.status(404)
			.send({ message: "Coupon is not available!", type: "error" });
	} else {
		// Checking if coupon is expired or inactive
		if (
			new Date().getTime() >= coupon[0].start_form.getTime() &&
			new Date().getTime() < coupon[0].expired_in.getTime() &&
			coupon[0].status === "active"
		) {
			console.log("Checking minimum shopping amount");
			// If the coupon is not expired
			// Checking if minimum shopping amount is okay
			if (req.body.amount >= coupon[0].min_shopping_amount) {
				// If shopping amount is okay

				// Checking if the user is eligible for the coupon
				if (coupon[0].users.length > 0) {
					const user = coupon[0].users.filter(
						(user) => user.toString() === req.user._id.toString()
					);

					if (user.length === 0) {
						// If user is not eligible for the coupon
						return res.status(400).send({
							message: "You are not eligible for this coupon.",
							type: "error",
						});
					}
				}

				// If user is eligible for the coupon
				// Checking if the user already used the coupon
				const already_used = coupon[0].appliers.filter(
					(user) => user.toString() === req.user._id.toString()
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
						.select({ product: 1, count: 1 });

					let total_amount = req.body.amount;

					// Checking if the coupon is valid for some products or all
					if (coupon[0].products.length > 0) {
						let temp = [];
						products.forEach((product) => {
							let eligable = coupon[0].products.find(
								(item) => item.toString() === product.product._id.toString()
							);

							if (eligable.length > 0) {
								temp.push(product);
							}
						});

						// Checking the shopping amount of eligible products
						if (temp.length > 0) {
							total_amount = temp.reduce(
								(total, product) =>
									total + product.product.unitPrice * product.count,
								0
							);
						}
					}

					if (total_amount < coupon[0].min_shopping_amount) {
						// If minimum amount is less then required
						return res.status(400).send({
							message:
								"Minimum shopping amount of eligible products should be " +
								coupon[0].min_shopping_amount,
							type: "error",
						});
					} else {
						// Otherwise
						return res.status(200).send({
							data: coupon[0].discounted_amount,
							message: "Coupon applied successfully!",
							type: "success",
						});
					}
				}
			} else {
				// If shopping amount is not okay
				return res.status(400).send({
					message:
						"Minimum shopping amount should be " +
						coupon[0].min_shopping_amount,
					type: "error",
				});
			}
		} else {
			// If coupon is expired or inactive
			return res.status(400).send({ message: "Coupon expired", type: "error" });
		}
	}
};
