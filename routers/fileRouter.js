const router = require("express").Router();
const {getImage} = require('../controllers/fileController')


router.get('/images/:name',  getImage);

module.exports = router;
