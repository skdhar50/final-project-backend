const router = require("express").Router();
const { bannerList, createBanner, updateBanner, removeBanner } = require("../../controllers/adminControllers/bannerController");

router.get('/', bannerList);
router.post('/', createBanner);
router.put('/:id', updateBanner);
router.delete('/:id', removeBanner)

module.exports = router;
