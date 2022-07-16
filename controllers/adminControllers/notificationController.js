const { Notification } = require('../../models/notification');
const { notificationMaker } = require('../../utilities/notification');

let notification = {};

notification.notificationList = async (req, res) => {
    try {
        res.json({
            data: {
                notifications: await Notification.find().sort({ _id: -1 }),
            },
            message: "Successfully retrievied!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
notification.showNotification = async (req, res) => {
    try {
        res.json({
            data: {
                notification: await Notification.findById(req.params.id)
            },
            message: "Successfully retrievied!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
notification.createNotification = async (req, res) => {
    const notification = await notificationMaker(
        req.body.title,
        req.body.description,
        req.body.type,
        req.body.notify_for,
        req.body.status
    )
    if (notification) {
        res.json({
            data: {
                notification
            },
            message: "notification was created successfully!",
            error: false,
        })
    } else {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
    
}
notification.updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            { new: true }
        );
        res.json({
            data: {
                notification
            },
            message: "notification was ted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
notification.removeNotification = async (req, res) => {
    try {
        res.json({
            data: {
                notification: await Notification.findByIdAndDelete(req.params.id),
            },
            message: "notification was deleted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}


module.exports = notification;