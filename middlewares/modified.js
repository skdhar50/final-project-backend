// user routes imports
const userUserRouter = require("../routers/userRouter");
const userCategoryRouter = require("../routers/categoryRouter");
const userBrandRouter = require("../routers/brandRouter");
const userProductRouter = require("../routers/productRouter");
const userCartRouter = require("../routers/cartRouter");
const userOfferRouter = require("../routers/offerRouter");
const userShippingAddressRouter = require("../routers/shippingAddressRouter");
const userWishlistRouter = require("../routers/wishlistRouter");
const userReviewRouter = require("../routers/reviewRouter");
const userQnaRouter = require("../routers/qnaRouter");
const userOrderRouter = require("../routers/orderRouter");
const userCityLocationRouter = require("../routers/cityLocationRouter");
const userPaymentRouter = require("../routers/paymentRouter");

// admin routes imports
const adminUserRouter = require("../routers/adminRouters/userRouter");
const adminBrandRouter = require("../routers/adminRouters/brandRouter");
const adminCategoryRouter = require("../routers/adminRouters/categoryRouter");
const adminProductRouter = require("../routers/adminRouters/productRouter");
const adminBannerRouter = require("../routers/adminRouters/bannerRouter");
const adminCarouselRouter = require("../routers/adminRouters/carouselRouter");
const adminCartRouter = require("../routers/adminRouters/cartRouter");
const adminOrderRouter = require("../routers/adminRouters/orderRouter");
const adminEmployeeRouter = require("../routers/adminRouters/employeeRouter");
const adminDealerRouter = require("../routers/adminRouters/dealerRouter");
const adminDealRouter = require("../routers/adminRouters/dealRouter");
const adminReviewRouter = require("../routers/adminRouters/reviewRouter");
const adminOfferRouter = require("../routers/adminRouters/offerRouter");
const adminCouponRouter = require("../routers/adminRouters/couponRouter");
const adminNotificationRouter = require("../routers/adminRouters/notificationRouter");

module.exports = (app) => {
	// user
	app.use("/api/user", userUserRouter);
	app.use("/api/category", userCategoryRouter);
	app.use("/api/product", userProductRouter);
	app.use("/api/cart", userCartRouter);
	app.use("/api/brand", userBrandRouter);
	app.use("/api/offer", userOfferRouter);
	app.use("/api/cityLocation", userCityLocationRouter);
	app.use("/api/order", userOrderRouter);
	app.use("/api/shippingAddress", userShippingAddressRouter);
	app.use("/api/wishlist", userWishlistRouter);
	app.use("/api/reviews", userReviewRouter);
	app.use("/api/qna", userQnaRouter);
	app.use("/api/payment", userPaymentRouter);

	// admin
	app.use("/users", adminUserRouter);
	app.use("/brands", adminBrandRouter);
	app.use("/categories", adminCategoryRouter);
	app.use("/products", adminProductRouter);
	app.use("/banners", adminBannerRouter);
	app.use("/carousels", adminCarouselRouter);
	app.use("/carts", adminCartRouter);
	app.use("/orders", adminOrderRouter);
	app.use("/employees", adminEmployeeRouter);
	app.use("/dealers", adminDealerRouter);
	app.use("/deals", adminDealRouter);
	app.use("/reviews", adminReviewRouter);
	app.use("/offers", adminOfferRouter);
	app.use("/coupons", adminCouponRouter);
	app.use("/notifications", adminNotificationRouter);
};
