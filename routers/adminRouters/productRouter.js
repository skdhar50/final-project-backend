const router = require("express").Router();
const { productList, showProduct, createProduct, updateProduct, removeProduct, addPhotos, removePhoto } = require("../../controllers/adminControllers/productController");
const { addProductValidators, productValidationHandler, updateProductValidators } = require("../../middlewares/validator/productValidator");

router.get('/', productList);
router.post('/', addProductValidators, productValidationHandler, createProduct);
router.get('/:id', showProduct);
router.put('/:id', updateProductValidators, productValidationHandler, updateProduct);
router.delete('/:id', removeProduct);
router.put('/add-photos/:id', addPhotos);
router.delete('/remove-photo/:id/:photo', removePhoto);

module.exports = router;
