const router = require("express").Router();
const { dealerList, showDealer, createDealer, updateDealer, removeDealer } = require("../../controllers/adminControllers/dealerController");
const { addDealerValidator, validationHandler, updateDealerValidator } = require("../../middlewares/validator/validator");

router.get('/', dealerList);
router.post('/', addDealerValidator, validationHandler, createDealer);
router.get('/:id', showDealer);
router.put('/:id', updateDealerValidator, validationHandler, updateDealer);
router.delete('/:id', removeDealer)

module.exports = router;
