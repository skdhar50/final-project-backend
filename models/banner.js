const {Schema, model} = require('mongoose');

const BannerSchema = Schema({

});

const Banner = model("banners", BannerSchema);

module.exports.Banner = Banner;