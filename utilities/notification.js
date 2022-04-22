const { Notification } = require('../models/notification');

let notification = {};

notification.notificationMaker = async (title, description, type = 'public', notifyFor = [], status = 'draft') => {
    const newNotification = new Notification({
        title,
        description,
        type,
        notify_for: notifyFor,
        status,
    })
    try {
        const notification = await newNotification.save();
        return notification
    } catch (err) {
        return false;
    }
}

module.exports = notification;