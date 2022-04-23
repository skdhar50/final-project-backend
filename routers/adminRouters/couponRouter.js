const router = require("express").Router();
const { couponList, showCoupon, createCoupon, updateCoupon, removeCoupon } = require("../../controllers/adminControllers/couponController");
const { addCouponValidator, validationHandler, updateCouponValidator } = require("../../middlewares/validator/validator");

router.get('/', couponList);
router.post('/', addCouponValidator, validationHandler, createCoupon);
router.get('/:id', showCoupon);
router.put('/:id', updateCouponValidator, validationHandler, updateCoupon);
router.delete('/:id', removeCoupon)

module.exports = router;
