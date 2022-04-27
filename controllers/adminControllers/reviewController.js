const { Review } = require('../../models/review');

let review = {};

review.reviewList = async (req, res) => {
    try {
        const reviews = await Review
            .find()
            .populate('user', 'name')
            .populate('product', 'name');
        res.json({
            data: {
                reviews,
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


review.updateReview = async (req, res) => {
    delete req.body.user;
    delete req.body.product;
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            { new: true }
        );
        res.json({
            data: {
                review
            },
            message: "review was updated successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
review.removeReview = async (req, res) => {
    try {
        res.json({
            data: {
                review: await Review.findByIdAndDelete(req.params.id),
            },
            message: "review was deleted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}


module.exports = review;