const adminRoutes = require('./adminRoutes');
const userRouter = require('../routers/userRouter');
const categoryRouter = require("../routers/categoryRouter");
const productRouter = require("../routers/productRouter");
const cartRouter = require("../routers/cartRouter");
const profileRouter = require("../routers/profileRouter");
const offerRouter = require("../routers/offerRouter");

module.exports = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api/offer', offerRouter);
    app.use('/api/admin', adminRoutes);
};
