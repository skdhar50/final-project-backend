const { Deal } = require('../../models/deal');

let deal = {};

deal.dealList = async (req, res) => {
    try {
        const deal = await Deal.find().populate('dealer', 'company name').sort({ _id: -1 });
        res.json({
            data: {
                deal,
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
deal.showDeal = async (req, res) => {
    try {
        const deal = await Deal
            .findById(req.params.id)
            .populate('dealer', 'name company phone email')
            .populate('products.brand', 'name')
            .populate('products.category', 'name')
        res.json({
            data: {
                deal,
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
deal.createDeal = async (req, res) => {
    // res.send(req.body)
    let data = {...req.body}
    if (parseInt(data.due,10)===0) {
        data.payment_status = "paid";
    } else if (data.deal_value === data.due) {
        data.payment_status = "unpaid";
    } else {
        data.payment_status = "risidual";
    }
    const newDeal = new Deal(data)
    try {
        const deal = await newDeal.save();
        res.json({
            data: {
                deal
            },
            message: "Deal was added successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
deal.updateDeal = async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            { new: true }
        );
        res.json({
            data: {
                deal
            },
            message: "Deal was ted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
deal.removeDeal = async (req, res) => {
    try {
        res.json({
            data: {
                deal: await Deal.findByIdAndDelete(req.params.id),
            },
            message: "Deal was deleted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}


module.exports = deal;