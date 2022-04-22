const { Coupon } = require('../../models/coupon');

let coupon = {};

coupon.couponList = async (req, res) => {
    try {
        const coupons = await Coupon
            .find()
            .populate('categories', 'name')
            .populate('brands', 'name')
            .populate('products', 'name price')
            .populate('users', 'name email');
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
        const coupon = await Coupon
            .findById(req.params.id)
            .populate('categories', 'name')
            .populate('brands', 'name')
            .populate('products', 'name price')
            .populate('users', 'name email');
        res.json({
            data: {
                coupon
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