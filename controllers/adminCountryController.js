var AdmincountryModel = require('../models/adminCountryModel.js');

/**
 * adminCountryController.js
 *
 * @description :: Server-side logic for managing adminCountrys.
 */
module.exports = {

    /**
     * adminCountryController.list()
     */
    list: function (req, res) {
        AdmincountryModel.find(function (err, adminCountrys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting adminCountry.',
                    error: err,
                    success:false,
                });
            }

            return res.status(200).json({
                success:true,
                adminCountrys
            });
        });
    },

    /**
     * adminCountryController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        AdmincountryModel.findOne({_id: id}, function (err, adminCountry) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting adminCountry.',
                    error: err
                });
            }

            if (!adminCountry) {
                return res.status(404).json({
                    message: 'No such adminCountry'
                });
            }

            return res.json({
                sucess:false,
                adminCountry});
        });
    },

    /**
     * adminCountryController.create()
     */
    create: async function (req, res) {
        
        
        
        var result = await AdmincountryModel.findOne({country:req.body.country});

        if(result){
            return res.status(400).json({
                success:false,
                message: 'already exist admin country',
                error: err
            });
        }
        
        var adminCountry = new AdmincountryModel({
			country : req.body.country,
			countrySteps : req.body.countrySteps
        });

        

        adminCountry.save(function (err, adminCountry) {
            if (err) {
                return res.status(500).json({
                    sucess:false,
                    message: 'Error when creating adminCountry',
                    error: err
                });
            }

            return res.status(201).json(adminCountry);
        });
    },

    /**
     * adminCountryController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        AdmincountryModel.findOne({_id: id}, function (err, adminCountry) {
            if (err) {
                return res.status(500).json({
                    sucess:false,
                    message: 'Error when getting adminCountry',
                    error: err
                });
            }

            if (!adminCountry) {
                return res.status(404).json({
                    sucess:false,
                    message: 'No such adminCountry'
                });
            }

            adminCountry.country = req.body.country ? req.body.country : adminCountry.country;
			adminCountry.countrySteps = req.body.countrySteps ? req.body.countrySteps : adminCountry.countrySteps;
			
            adminCountry.save(function (err, adminCountry) {
                if (err) {
                    return res.status(500).json({
                        sucess:false,
                        message: 'Error when updating adminCountry.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    adminCountry});
            });
        });
    },

    /**
     * adminCountryController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        AdmincountryModel.findByIdAndRemove(id, function (err, adminCountry) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the adminCountry.',
                    error: err
                });
            }

            return res.status(204).json({
                success:true
            });
        });
    }
};
