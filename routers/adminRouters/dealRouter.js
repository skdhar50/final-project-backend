const router = require("express").Router();
const { dealList, showDeal, createDeal, updateDeal, removeDeal } = require("../../controllers/adminControllers/dealController");
const { addDealValidator, validationHandler, UpdateDealValidator } = require("../../middlewares/validator/validator");

router.get('/', dealList);
router.post('/', addDealValidator, validationHandler, createDeal);
router.get('/:id', showDeal);
router.put('/:id', UpdateDealValidator, validationHandler, updateDeal);
router.delete('/:id', removeDeal)

module.exports = router;
