const router = require("express").Router();
const { orderList, showOrder, updateOrder, removeOrder} = require("../../controllers/adminControllers/orderController");

router.get('/', orderList);
router.get('/:id', showOrder);
router.put('/:id', updateOrder);
router.delete('/:id', removeOrder)

module.exports = router;
