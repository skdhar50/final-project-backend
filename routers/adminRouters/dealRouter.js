const router = require("express").Router();
const { dealList, showDeal, createDeal, updateDeal, removeDeal } = require("../../controllers/adminControllers/dealController");

router.get('/', dealList);
router.post('/', createDeal);
router.get('/:id', showDeal);
router.put('/:id', updateDeal);
router.delete('/:id', removeDeal)

module.exports = router;
