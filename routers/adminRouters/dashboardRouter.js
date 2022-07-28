const router = require("express").Router();
const { shortSummary, stockProducts, topCategories } = require("../../controllers/adminControllers/dashboardController");


router.get('/', shortSummary);
router.get('/summary-of-products-stock', stockProducts);
router.get('/top-categories', topCategories);

module.exports = router;
