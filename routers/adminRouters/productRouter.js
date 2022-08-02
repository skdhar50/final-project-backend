const router = require("express").Router();
const { productList, showProduct, createProduct, updateProduct, removeProduct, addPhotos, removePhoto, answerQna } = require("../../controllers/adminControllers/productController");
const { addProductValidators, updateProductValidators, addPhotosValidators } = require("../../middlewares/validator/productValidator");
const { validationHandler } = require("../../middlewares/validator/validator");

router.get('/', productList);
router.post('/', addProductValidators, validationHandler, createProduct);
router.get('/:id', showProduct);
router.put('/:id', updateProductValidators, validationHandler, updateProduct);
router.delete('/:id', removeProduct);
router.post('/add-photos/:id', addPhotosValidators, validationHandler, addPhotos);
router.delete('/remove-photo/:id/:photo', removePhoto);
router.put('/answer-qna/:id', answerQna);

module.exports = router;
