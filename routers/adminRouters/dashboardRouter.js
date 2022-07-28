const router = require("express").Router();
const { shortSummary, stockProducts, topCategories, sellingStatus } = require("../../controllers/adminControllers/dashboardController");


router.get('/', shortSummary);
router.get('/summary-of-products-stock', stockProducts);
router.get('/top-categories', topCategories);
router.get('/selling-status', sellingStatus);

module.exports = router;
