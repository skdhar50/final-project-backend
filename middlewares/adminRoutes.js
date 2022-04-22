const admin = require("express")();
const userRouter = require('../routers/adminRouters/userRouter');
const brandRouter = require('../routers/adminRouters/brandRouter');
const categoryRouter = require('../routers/adminRouters/categoryRouter');
const productRouter = require('../routers/adminRouters/productRouter');
const bannerRouter = require('../routers/adminRouters/bannerRouter');
const carouselRouter = require('../routers/adminRouters/carouselRouter');
const cartRouter = require('../routers/adminRouters/cartRouter');
const orderRouter = require('../routers/adminRouters/orderRouter');
const employeeRouter = require('../routers/adminRouters/employeeRouter');
const dealerRouter = require('../routers/adminRouters/dealerRouter');
const dealRouter = require('../routers/adminRouters/dealRouter');
const reviewRouter = require('../routers/adminRouters/reviewRouter');
const offerRouter = require('../routers/adminRouters/offerRouter');
const couponRouter = require('../routers/adminRouters/couponRouter');
const notificationRouter = require('../routers/adminRouters/notificationRouter');


admin.use('/users', userRouter);
admin.use('/brands', brandRouter);
admin.use('/categories', categoryRouter);
admin.use('/products', productRouter);
admin.use('/banners', bannerRouter);
admin.use('/carousels', carouselRouter);
admin.use('/carts', cartRouter);
admin.use('/orders', orderRouter);
admin.use('/employees', employeeRouter);
admin.use('/dealers', dealerRouter);
admin.use('/deals', dealRouter);
admin.use('/reviews', reviewRouter);
admin.use('/offers', offerRouter);
admin.use('/coupons', couponRouter);
admin.use('/notifications', notificationRouter);


module.exports = admin;
