const {User} = require('../models/user');

module.exports.Hello = (req, res) => {
    return res.status(200).send("Hello, world!");
}