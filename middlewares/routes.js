// const adminRoutes = require('./adminRoutes');
const userRouter = require('../routers/userRouter');
const categoryRouter = require("../routers/categoryRouter");
const brandRouter = require("../routers/brandRouter");
const productRouter = require("../routers/productRouter");
const cartRouter = require("../routers/cartRouter");
// const profileRouter = require("../routers/profileRouter");
// const offerRouter = require("../routers/offerRouter");
// const fileRouter = require("../routers/fileRouter");
const shippingAddressRouter = require("../routers/shippingAddressRouter");
const wishlistRouter = require("../routers/wishlistRouter");

module.exports = (app) => {
    // app.use('/file', fileRouter);
    app.use('/api/user', userRouter);
    // app.use('/api/category', categoryRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use("/api/brand", brandRouter);
    // app.use('/api/profile', profileRouter);
    // app.use('/api/offer', offerRouter);
    // app.use('/api/admin', adminRoutes);
    app.use('/api/shippingAddress', shippingAddressRouter);
    app.use("/api/wishlist", wishlistRouter);
};
