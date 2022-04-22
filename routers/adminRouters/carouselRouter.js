const router = require("express").Router();
const { carouselList, createCarousel, updateCarousel, removeCarousel } = require("../../controllers/adminControllers/carouselController");

router.get('/', carouselList);
router.post('/', createCarousel);
router.put('/:id', updateCarousel);
router.delete('/:id', removeCarousel)

module.exports = router;
