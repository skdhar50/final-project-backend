const router = require("express").Router();
const { carouselList, createCarousel, updateCarousel, removeCarousel } = require("../../controllers/adminControllers/carouselController");
const { addCarouselValidator, validationHandler, updateCarouselValidator } = require("../../middlewares/validator/validator");

router.get('/', carouselList);
router.post('/',  addCarouselValidator, validationHandler,  createCarousel);
router.put('/:id', updateCarouselValidator, validationHandler
, updateCarousel);
router.delete('/:id', removeCarousel)

module.exports = router;
