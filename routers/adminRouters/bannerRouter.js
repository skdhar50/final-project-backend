const router = require("express").Router();
const { bannerList, createBanner, updateBanner, removeBanner } = require("../../controllers/adminControllers/bannerController");
const { addBannerValidator, validationHandler, updateBannerValidator } = require("../../middlewares/validator/validator");

router.get('/', bannerList);
router.post('/', addBannerValidator, validationHandler, createBanner);
router.put('/:id', updateBannerValidator, validationHandler, updateBanner);
router.delete('/:id', removeBanner)

module.exports = router;
