const router = require("express").Router();
const { offerList, showOffer, createOffer, updateOffer, removeOffer } = require("../../controllers/adminControllers/offerController");
const { addOfferValidator, validationHandler, updateOfferValidator } = require("../../middlewares/validator/validator");

router.get('/', offerList);
router.post('/', addOfferValidator, validationHandler, createOffer);
router.get('/:id', showOffer);
router.put('/:id', updateOfferValidator, validationHandler, updateOffer);
router.delete('/:id', removeOffer)

module.exports = router;
