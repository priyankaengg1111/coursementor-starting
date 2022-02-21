var NotificationModel = require('../models/notificationModel.js');

/**
 * notificationController.js
 *
 * @description :: Server-side logic for managing notifications.
 */
module.exports = {

    /**
     * notificationController.list()
     */
    list: function (req, res) {
        NotificationModel.find(function (err, notifications) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting notification.',
                    error: err
                });
            }

            return res.json(notifications);
        });
    },

    /**
     * notificationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        NotificationModel.findOne({_id: id}, function (err, notification) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting notification.',
                    error: err
                });
            }

            if (!notification) {
                return res.status(404).json({
                    message: 'No such notification'
                });
            }

            return res.json(notification);
        });
    },

    /**
     * notificationController.create()
     */
    create: function (req, res) {
        var notification = new NotificationModel({
			message : req.body.message,
			studentID : req.body.studentID
        });

        notification.save(function (err, notification) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating notification',
                    error: err
                });
            }

            return res.status(201).json(notification);
        });
    },

    /**
     * notificationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        NotificationModel.findOne({_id: id}, function (err, notification) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting notification',
                    error: err
                });
            }

            if (!notification) {
                return res.status(404).json({
                    message: 'No such notification'
                });
            }

            notification.message = req.body.message ? req.body.message : notification.message;
			notification.studentID = req.body.studentID ? req.body.studentID : notification.studentID;
			
            notification.save(function (err, notification) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating notification.',
                        error: err
                    });
                }

                return res.json(notification);
            });
        });
    },

    /**
     * notificationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        NotificationModel.findByIdAndRemove(id, function (err, notification) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the notification.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
