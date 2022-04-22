const router = require("express").Router();
const { notificationList, showNotification, createNotification, updateNotification, removeNotification } = require("../../controllers/adminControllers/notificationController");

router.get('/', notificationList);
router.post('/', createNotification);
router.get('/:id', showNotification);
router.put('/:id', updateNotification);
router.delete('/:id', removeNotification);

module.exports = router;
