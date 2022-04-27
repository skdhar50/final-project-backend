const router = require("express").Router();
const { notificationList, showNotification, createNotification, updateNotification, removeNotification } = require("../../controllers/adminControllers/notificationController");
const { addNotificationValidator, validationHandler, updateNotificationValidator } = require("../../middlewares/validator/validator");

router.get('/', notificationList);
router.post('/', addNotificationValidator, validationHandler, createNotification);
router.get('/:id', showNotification);
router.put('/:id', updateNotificationValidator, validationHandler, updateNotification);
router.delete('/:id', removeNotification);

module.exports = router;
