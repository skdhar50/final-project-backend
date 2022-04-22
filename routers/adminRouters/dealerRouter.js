const router = require("express").Router();
const { dealerList, showDealer, createDealer, updateDealer, removeDealer } = require("../../controllers/adminControllers/dealerController");

router.get('/', dealerList);
router.post('/', createDealer);
router.get('/:id', showDealer);
router.put('/:id', updateDealer);
router.delete('/:id', removeDealer)

module.exports = router;
