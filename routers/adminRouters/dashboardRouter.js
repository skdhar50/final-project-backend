const router = require("express").Router();
const { shortSummary } = require("../../controllers/adminControllers/dashboardController");


router.get('/', shortSummary);

module.exports = router;
