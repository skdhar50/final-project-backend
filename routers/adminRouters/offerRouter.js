const router = require("express").Router();
const { offerList, showOffer, createOffer, updateOffer, removeOffer } = require("../../controllers/adminControllers/offerController");

router.get('/', offerList);
router.post('/', createOffer);
router.get('/:id', showOffer);
router.put('/:id', updateOffer);
router.delete('/:id', removeOffer)

module.exports = router;
