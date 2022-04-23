const path = require("path");
const fs = require('fs');

let controllers = {}

controllers.getImage = (req, res) => {
    try {
        const filePath = path.resolve(`${path.join(__dirname, '../storages/images')}/${req.params.name}`);
        const fileCheck = fs.existsSync(filePath)
        if (fileCheck) {
            res.sendFile(filePath)
        } else {
            res.status(404).json({
            message: "File not found!", 
            error: true
        })
        }
    } catch(err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

module.exports = controllers;