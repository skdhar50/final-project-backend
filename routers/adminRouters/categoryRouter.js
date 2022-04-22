const router = require("express").Router();
const { categoryList, showCategory, createCategory, updateCategory, removeCategory } = require("../../controllers/adminControllers/categoryController");

router.get('/', categoryList);
router.post('/',createCategory);
router.get('/:id', showCategory);
router.put('/:id', updateCategory);
router.delete('/:id', removeCategory)

module.exports = router;
