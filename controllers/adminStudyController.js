var adminStudyModel = require('../models/adminStudyModel.js');
var adminModel = require('../models/adminModel');
/**
 * adminStudyController.js
 *
 * @description :: Server-side logic for managing adminStudies.
 */
module.exports = {

    /**
     * adminStudyController.list()
     */
    list: async function (req, res) {

        var adminData = await adminModel.find({});

        if (!adminData) {
            return res.status(502).json({
                success: false,
                message: 'No admin find in admin data',
            });
        }

        adminData = adminData[0]
        adminStudyModel.find({
            _id: {
                $in: adminData.adminStudies
            }
        }, function (err, adminStudies) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when getting adminStudy.',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                adminStudies
            });
        });
    },

    /**
     * adminStudyController.show()
     */
    show: async function (req, res) {
        console.log("jj")

        try {
            var adminData = await adminModel.find({});

            if (!adminData) {
                return res.status(502).json({
                    success: false,
                    message: 'No admin find in admin data',
                });
            }

            adminData = adminData[0]
            var id = req.params.id;
            console.log(id, adminData)
            if (!adminData.adminStudies) {
                console.log("i am done")
                return res.status(502).json({
                    success: false,
                    message: 'No Studys find in user data',
                });
            }

            console.log("hello world")
            if (!adminData.adminStudies.find((element) => element == id)) {
                return res.status(502).json({
                    success: false,
                    message: 'No Studys find in user data',
                });
            }

            adminStudyModel.findOne({
                _id: id
            }, function (err, adminStudy) {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error when getting adminStudy.',
                        error: err
                    });
                }

                if (!adminStudy) {
                    return res.status(404).json({
                        success: false,
                        message: 'No such adminStudy'
                    });
                }

                return res.status(200).json({
                    success: true,
                    adminStudy: adminStudy
                });
            });
        }
        catch (e) {
            console.log("i am done")
            return res.status(502).json({
                success: false,
                message: 'No Admin find in admin data',
            });
        }
    },

    /**
     * adminStudyController.create()
     */
    create: function (req, res) {

        var adminData = res.locals.admin;

        var adminStudyData = new adminStudyModel({
            Study: req.body.Study,
        });
        console.log("hello world")
        adminStudyData.save(function (err, adminStudy) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when creating adminStudy',
                    error: err
                });
            }
            adminModel.findOne({
                _id: adminData._id
            }, async (err, admin) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error when creating Study in admin',
                        error: err
                    });
                }
                if (!admin) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error finding admin',
                    });
                }
                if (!admin.adminStudies) {
                    admin.adminStudies = [];
                }
                admin.adminStudies.push(adminStudy._id)
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
     * adminStudyController.update()
     */
    update: function (req, res) {

        var adminData = res.locals.admin;
        var id = req.params.id;
        if (adminData.adminStudies == null) {
            return res.status(502).json({
                success: false,
                message: 'No Studys find in user data',
            });
        }

        if (!adminData.adminStudies.find((element) => element == id)) {
            return res.status(502).json({
                success: false,
                message: 'No Studys find in user data',
            });
        }

        adminStudyModel.findOne({
            _id: id
        }, function (err, adminStudy) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when getting adminStudy',
                    error: err
                });
            }

            if (!adminStudy) {
                return res.status(404).json({
                    success: false,
                    message: 'No such adminStudy'
                });
            }

            adminStudy.Study = req.body.Study ? req.body.Study : adminStudy.Study;

            adminStudy.save(function (err, adminStudy) {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error when updating adminStudy.',
                        error: err
                    });
                }

                return res.json({
                    success: true,
                    message: "Updated the Study"
                });
            });
        });
    },

    /**
     * adminStudyController.remove()
     */
    remove: function (req, res) {


        var adminData = res.locals.admin;
        var id = req.params.id;
        if (adminData.adminStudies == null) {
            return res.status(502).json({
                success: false,
                message: 'No Studys find in user data',
            });
        }

        if (!adminData.adminStudies.find((element) => element == id)) {
            return res.status(502).json({
                success: false,
                message: 'No Studys find in user data',
            });
        }

        adminStudyModel.findByIdAndRemove(id, function (err, adminStudy) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when deleting the adminStudy.',
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