const router = require("express").Router();
const { brandList, showBrand, createBrand, updateBrand, removeBrand } = require("../../controllers/adminControllers/brandController");
// const imageUpload = require('../../middlewares/imageUpload');

router.get('/', brandList);
router.post('/',createBrand);
router.get('/:id', showBrand);
router.put('/:id', updateBrand);
router.delete('/:id', removeBrand)

module.exports = router;
