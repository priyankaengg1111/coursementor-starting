var adminEnglishProficiencyModel = require('../models/adminEnglishProficiencyModel.js');
var adminModel = require('../models/adminModel');
/**
 * adminEnglishProficiencyController.js
 *
 * @description :: Server-side logic for managing adminEnglishProficiencies.
 */
module.exports = {

    /**
     * adminEnglishProficiencyController.list()
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
        adminEnglishProficiencyModel.find({
            _id: {
                $in: adminData.adminEnglishProficiencies
            }
        }, function (err, adminEnglishProficiencies) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when getting adminEnglishProficiency.',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                adminEnglishProficiencies
            });
        });
    },

    /**
     * adminEnglishProficiencyController.show()
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
            if (!adminData.adminEnglishProficiencies) {
                console.log("i am done")
                return res.status(502).json({
                    success: false,
                    message: 'No EnglishProficiencys find in user data',
                });
            }

            console.log("hello world")
            if (!adminData.adminEnglishProficiencies.find((element) => element == id)) {
                return res.status(502).json({
                    success: false,
                    message: 'No EnglishProficiencys find in user data',
                });
            }

            adminEnglishProficiencyModel.findOne({
                _id: id
            }, function (err, adminEnglishProficiency) {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error when getting adminEnglishProficiency.',
                        error: err
                    });
                }

                if (!adminEnglishProficiency) {
                    return res.status(404).json({
                        success: false,
                        message: 'No such adminEnglishProficiency'
                    });
                }

                return res.status(200).json({
                    success: true,
                    adminEnglishProficiency: adminEnglishProficiency
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
     * adminEnglishProficiencyController.create()
     */
    create: function (req, res) {

        var adminData = res.locals.admin;

        var adminEnglishProficiencyData = new adminEnglishProficiencyModel({
            EnglishProficiency: req.body.EnglishProficiency,
        });
        console.log("hello world")
        adminEnglishProficiencyData.save(function (err, adminEnglishProficiency) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when creating adminEnglishProficiency',
                    error: err
                });
            }
            adminModel.findOne({
                _id: adminData._id
            }, async (err, admin) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error when creating EnglishProficiency in admin',
                        error: err
                    });
                }
                if (!admin) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error finding admin',
                    });
                }
                if (!admin.adminEnglishProficiencies) {
                    admin.adminEnglishProficiencies = [];
                }
                admin.adminEnglishProficiencies.push(adminEnglishProficiency._id)
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
     * adminEnglishProficiencyController.update()
     */
    update: function (req, res) {

        var adminData = res.locals.admin;
        var id = req.params.id;
        if (adminData.adminEnglishProficiencies == null) {
            return res.status(502).json({
                success: false,
                message: 'No EnglishProficiencys find in user data',
            });
        }

        if (!adminData.adminEnglishProficiencies.find((element) => element == id)) {
            return res.status(502).json({
                success: false,
                message: 'No EnglishProficiencys find in user data',
            });
        }

        adminEnglishProficiencyModel.findOne({
            _id: id
        }, function (err, adminEnglishProficiency) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when getting adminEnglishProficiency',
                    error: err
                });
            }

            if (!adminEnglishProficiency) {
                return res.status(404).json({
                    success: false,
                    message: 'No such adminEnglishProficiency'
                });
            }

            adminEnglishProficiency.EnglishProficiency = req.body.EnglishProficiency ? req.body.EnglishProficiency : adminEnglishProficiency.EnglishProficiency;

            adminEnglishProficiency.save(function (err, adminEnglishProficiency) {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: 'Error when updating adminEnglishProficiency.',
                        error: err
                    });
                }

                return res.json({
                    success: true,
                    message: "Updated the EnglishProficiency"
                });
            });
        });
    },

    /**
     * adminEnglishProficiencyController.remove()
     */
    remove: function (req, res) {


        var adminData = res.locals.admin;
        var id = req.params.id;
        if (adminData.adminEnglishProficiencies == null) {
            return res.status(502).json({
                success: false,
                message: 'No EnglishProficiencys find in user data',
            });
        }

        if (!adminData.adminEnglishProficiencies.find((element) => element == id)) {
            return res.status(502).json({
                success: false,
                message: 'No EnglishProficiencys find in user data',
            });
        }

        adminEnglishProficiencyModel.findByIdAndRemove(id, function (err, adminEnglishProficiency) {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: 'Error when deleting the adminEnglishProficiency.',
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