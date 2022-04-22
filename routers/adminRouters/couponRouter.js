const router = require("express").Router();
const { couponList, showCoupon, createCoupon, updateCoupon, removeCoupon } = require("../../controllers/adminControllers/couponController");

router.get('/', couponList);
router.post('/', createCoupon);
router.get('/:id', showCoupon);
router.put('/:id', updateCoupon);
router.delete('/:id', removeCoupon)

module.exports = router;
