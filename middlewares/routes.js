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
const userCouponRouter = require("../routers/couponRouter");
const userCarouselRouter = require("../routers/carouselRouter");

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
const adminCrmRouter = require("../routers/adminRouters/crmRouter");
const adminDashboard = require("../routers/adminRouters/dashboardRouter");
const adminAuth = require("./adminAuth");

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
	app.use("/api/coupon", userCouponRouter);
	app.use("/api/carousel", userCarouselRouter);

	// admin
	app.use("/api/admin", adminAuth);
	app.use("/api/admin/users", adminUserRouter);
	app.use("/api/admin/brands", adminBrandRouter);
	app.use("/api/admin/categories", adminCategoryRouter);
	app.use("/api/admin/products", adminProductRouter);
	app.use("/api/admin/banners", adminBannerRouter);
	app.use("/api/admin/carousels", adminCarouselRouter);
	app.use("/api/admin/carts", adminCartRouter);
	app.use("/api/admin/orders", adminOrderRouter);
	app.use("/api/admin/employees", adminEmployeeRouter);
	app.use("/api/admin/dealers", adminDealerRouter);
	app.use("/api/admin/deals", adminDealRouter);
	app.use("/api/admin/reviews", adminReviewRouter);
	app.use("/api/admin/offers", adminOfferRouter);
	app.use("/api/admin/coupons", adminCouponRouter);
	app.use("/api/admin/notifications", adminNotificationRouter);
	app.use("/api/admin/crm", adminCrmRouter);
	app.use("/api/admin/dashboard", adminDashboard);
};
