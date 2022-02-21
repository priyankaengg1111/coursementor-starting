var adminApplicationModel = require('../models/adminApplicationModel.js');
var adminModel = require('../models/adminModel');
/**
 * adminApplicationController.js
 *
 * @description :: Server-side logic for managing adminApplications.
 */
module.exports = {

    /**
     * adminApplicationController.list()
     */
    list:  async function (req, res) {
        
        var adminData = await adminModel.find({});

        if (!adminData) {
            return res.status(502).json({
                success:false,
                message: 'No admin find in admin data',
            });
        }

        adminData = adminData[0]
        adminApplicationModel.find({
            _id: {
                $in: adminData.adminApplications
            }
        }, function (err, adminApplications) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when getting adminApplication.',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                adminApplications
            });
        });
    },

    /**
     * adminApplicationController.show()
     */
    show: async function (req, res) {


        try {
            var adminData = await adminModel.find({});

            if (!adminData) {
                return res.status(502).json({
                    success:false,
                    message: 'No admin find in admin data',
                });
            }

            adminData = adminData[0]
            var id = req.params.id;
            console.log(id, adminData)
            if (!adminData.adminApplications) {
                console.log("i am done")
                return res.status(502).json({
                    success: false,
                    message: 'No Applications find in user data',
                });
            }

            console.log("hello world")
            if (!adminData.adminApplications.find((element) => element == id)) {
                return res.status(502).json({
                    success: false,
                    message: 'No Applications find in user data',
                });
            }

            adminApplicationModel.findOne({
                _id: id
            }, function (err, adminApplication) {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error when getting adminApplication.',
                        error: err
                    });
                }

                if (!adminApplication) {
                    return res.status(404).json({
                        success: false,
                        message: 'No such adminApplication'
                    });
                }

                return res.status(200).json({
                    success: true,
                    adminApplication: adminApplication
                });
            });
        }
        catch(e){
              console.log("i am done")
                return res.status(502).json({
                    success:false,
                    message: 'No Admin find in admin data',
                });
            }
    },

    /**
     * adminApplicationController.create()
     */
    create: function (req, res) {

        var adminData = res.locals.admin;

        var adminApplicationData = new adminApplicationModel({
            application: req.body.application,
        });
        console.log("hello world")
        adminApplicationData.save(function (err, adminApplication) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when creating adminApplication',
                    error: err
                });
            }
            adminModel.findOne({
                _id: adminData._id
            }, async (err, admin) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error when creating Application in admin',
                        error: err
                    });
                }
                if (!admin) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error finding admin',
                    });
                }
                if (!admin.adminApplications) {
                    admin.adminApplications = [];
                }
                admin.adminApplications.push(adminApplication._id)
                console.log(admin)
                try {
                    await admin.save();
                    return res.status(200).json({
                        success: true,
                        message: 'Saved Mongo Db Data',
                    });
                } catch (e) {
                    console.log(e)
                    return res.status(200).json({
                        success: false,
                        message: 'Error in Saving admin',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * adminApplicationController.update()
     */
    update: function (req, res) {

        var adminData = res.locals.admin;
        var id = req.params.id;
        if (adminData.adminApplications == null) {
            return res.status(502).json({
                success: false,
                message: 'No Applications find in user data',
            });
        }

        if (!adminData.adminApplications.find((element) => element == id)) {
            return res.status(502).json({
                success: false,
                message: 'No Applications find in user data',
            });
        }

        adminApplicationModel.findOne({
            _id: id
        }, function (err, adminApplication) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when getting adminApplication',
                    error: err
                });
            }

            if (!adminApplication) {
                return res.status(404).json({
                    success: false,
                    message: 'No such adminApplication'
                });
            }

            adminApplication.application = req.body.application ? req.body.application : adminApplication.application;

            adminApplication.save(function (err, adminApplication) {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error when updating adminApplication.',
                        error: err
                    });
                }

                return res.json({
                    success: true,
                    message: "Updated the Application"
                });
            });
        });
    },

    /**
     * adminApplicationController.remove()
     */
    remove: function (req, res) {


        var adminData = res.locals.admin;
        var id = req.params.id;
        if (adminData.adminApplications == null) {
            return res.status(502).json({
                success: false,
                message: 'No Applications find in user data',
            });
        }

        if (!adminData.adminApplications.find((element) => element == id)) {
            return res.status(502).json({
                success: false,
                message: 'No Applications find in user data',
            });
        }

        adminApplicationModel.findByIdAndRemove(id, function (err, adminApplication) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when deleting the adminApplication.',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: "Deleted Succesfully"
            });
        });
    }
};