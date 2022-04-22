const router = require("express").Router();
const { cartUsers, cartItemsByUser, removeItem} = require("../../controllers/adminControllers/cartController");

router.get('/', cartUsers);
router.get('/:cus_id', cartItemsByUser);
router.delete('/:id', removeItem)

module.exports = router;
