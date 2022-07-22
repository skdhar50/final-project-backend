const router = require("express").Router();
const { locations, productsByArea} = require("../../controllers/adminControllers/crmController");

router.get('/locations', locations);
router.post('/productsByArea', productsByArea);
// router.get('/:id', showOrder);
// router.put('/:id', updateOrder);
// router.delete('/:id', removeOrder)

module.exports = router;
