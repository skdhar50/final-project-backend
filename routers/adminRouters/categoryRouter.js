const router = require("express").Router();
const { categoryList, showCategory, createCategory, updateCategory, removeCategory } = require("../../controllers/adminControllers/categoryController");
const { addCategoryValidator, validationHandler, updateCategoryValidator } = require("../../middlewares/validator/validator");

router.get('/', categoryList);
router.post('/', addCategoryValidator, validationHandler, createCategory);
router.get('/:id', showCategory);
router.put('/:id', updateCategoryValidator, validationHandler, updateCategory);
router.delete('/:id', removeCategory)

module.exports = router;
