const { Brand } = require('../../models/brand');
const { Product } = require('../../models/product');
const { Review } = require('../../models/review');
const { User } = require('../../models/user');

let dashboard = {};
dashboard.shortSummary = async (req, res) => {
    
    try {
        let data = {};
        data.user = await User.count();
        data.brand = await Brand.count();
        
        res.json({
            data,
            message:"Product was added successfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}



module.exports = dashboard;
