const { Banner } = require('../../models/banner');
const {base64Decrypt} = require('../../utilities/base64');

let banner = {}

banner.createBanner = async (req, res) => {
    const newBanner = new Banner({
        image_path: base64Decrypt(req.body.photo),
        link_to: req.body.link_to,
        size: req.body.size
        
    })
    try {
        const banner  = await newBanner.save()
        res.json({
            data: {
                banner,
            },
            message: "Banner was added suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
        
    }
}

banner.bannerList = async (req, res) => {
    try {
        res.json({
            data: {
                banner: await Banner.find(),
            },
            message: "Suceesfully retrived!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })

    }
}

banner.removeBanner = async (req, res) => {
    try{
        res.json({
            data: {
                banner: await Banner.findByIdAndDelete(req.params.id),
            },
            message: "Banner was deleted suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })

    }
}
banner.updateBanner = async (req, res) => {
    
    try {
        const banner = await Banner.findByIdAndUpdate(req.params.id,  {
                $set: {...req.body}
            },{new: true});
        res.json({
            data: {
                banner,
            },
            message: "Banner was updarted suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
        
    }
}

module.exports = banner;