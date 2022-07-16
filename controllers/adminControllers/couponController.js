const { Coupon } = require('../../models/coupon');
const { Product } = require('../../models/product');
const { User } = require('../../models/user');

let coupon = {};

coupon.couponList = async (req, res) => {
    try {
        const coupons = await Coupon
            .find()
            .populate('categories', 'name')
            .populate('brands', 'name')
            .populate('products', 'name price')
            .populate('users', 'name email')
            .sort({ _id: -1 });
        res.json({
            data: {
                coupons,
            },
            message: "Successfully retrievied!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
coupon.showCoupon = async (req, res) => {
    try {
        let coupon = await Coupon
            .findById(req.params.id);
            // .populate('categories', 'name')
            // .populate('brands', 'name')
            // .populate('products', 'name price')
            // .populate('appliers', 'name email');
        
        
        coupon.products = await Product.find({ '_id': { $in: coupon['products'] } })
            .populate('brand', 'name')
            .populate('category', 'name');
        
        coupon._doc.users = await User.aggregate([
            {
                $match: { _id: { $in: coupon['users'] } }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "user",
                    as: "profile",
                },
            },
            {$unwind: "$profile" },
        ]);
        coupon._doc.appliers = await User.aggregate([
            {
                $match: { _id: { $in: coupon['appliers'] } }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "user",
                    as: "profile",
                },
            },
            {$unwind: "$profile" },
        ]);

        
        res.json({
            data: {
                coupon: coupon
            },
            message: "Successfully retrievied!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
coupon.createCoupon = async (req, res) => {
    // res.send(req.body)
    const newCoupon = new Coupon({
        ...req.body
    })
    try {
        const check = await Coupon.findOne({ code: req.body.code });
        if (check) {
            res.json({
                data: {
                    coupon: check
                },
                message: "coupon already created!",
                error: true,
            })
        } else {
            const coupon = await newCoupon.save();
            res.json({
                data: {
                    coupon
                },
                message: "coupon was added successfully!",
                error: false,
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
coupon.updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            { new: true }
        );
        res.json({
            data: {
                coupon
            },
            message: "coupon was updated successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
coupon.removeCoupon = async (req, res) => {
    try {
        res.json({
            data: {
                coupon: await Coupon.findByIdAndDelete(req.params.id),
            },
            message: "coupon was deleted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}


module.exports = coupon;