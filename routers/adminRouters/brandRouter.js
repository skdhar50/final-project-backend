const router = require("express").Router();
const { brandList, showBrand, createBrand, updateBrand, removeBrand } = require("../../controllers/adminControllers/brandController");
const { addBrandValidator, updateBrandValidator, validationHandler } = require("../../middlewares/validator/validator");

router.get('/', brandList);
router.post('/', addBrandValidator, validationHandler, createBrand);
router.get('/:id', showBrand);
router.put('/:id', updateBrandValidator, validationHandler, updateBrand);
router.delete('/:id', removeBrand)

module.exports = router;
