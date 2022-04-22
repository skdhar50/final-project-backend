const { Dealer } = require('../../models/dealer');
const mongoose = require('mongoose');

let dealer = {};

dealer.dealerList = async (req, res) => {
    try {
        res.json({
            data: {
                dealer: await Dealer.find(),
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
dealer.showDealer = async (req, res) => {
    try {
        // const dealer = await Dealer.findById(req.params.id);
        const dealer = await Dealer.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id)  } },
            {
                $lookup: {
                from: "deals",
                localField: "_id",
                foreignField: "dealer",
                as: "deals",
                },
            },
            // {$unwind: "$profile" },
        ]);
        res.json({
            data: {
                dealer,
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
dealer.createDealer = async (req, res) => {
    // res.send(req.body)
    const newDealer = new Dealer({
        ...req.body
    })
    try {
        const dealer = await newDealer.save();
        res.json({
            data: {
                dealer
            },
            message: "Dealer was added successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
dealer.updateDealer = async (req, res) => {
    try {
        const dealer = await Dealer.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            { new: true }
        );
        res.json({
            data: {
                dealer
            },
            message: "Dealer was ted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
dealer.removeDealer = async (req, res) => {
    try {
        res.json({
            data: {
                dealer: await Dealer.findByIdAndDelete(req.params.id),
            },
            message: "Dealer was deleted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}


module.exports = dealer;