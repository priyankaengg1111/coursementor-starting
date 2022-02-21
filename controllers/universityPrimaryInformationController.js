var universityPrimaryInformationModel = require('../models/universityPrimaryInformationModel.js');
var universityModel = require('../models/universityModel')

/**
 * universityPrimaryInformationController.js
 *
 * @description :: Server-side logic for managing universityPrimaryInformations.
 */
module.exports = {
    /**
     * universityPrimaryInformationController.show()
     */
    show: function (req, res) {
       var universityData = res.locals.university; 
       res.locals.university = null;
       console.log(universityData);
        universityPrimaryInformationModel.findOne({_id: universityData.universityPrimaryInformation}, function (err, universityPrimaryInformation) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting universityPrimaryInformation.',
                    error: err
                });
            }

            if (!universityPrimaryInformation) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityPrimaryInformation'
                });
            }

            return res.status(200).json(
            {
                success:true,
                universityPrimaryInformation:universityPrimaryInformation
            });
        });
    },

    /**
     * universityPrimaryInformationController.update()
     */
    update: function (req, res) {
        var universityData = res.locals.university;
        res.locals.university = null;
        universityModel.findOne({_id: universityData._id}, function (err, university) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting university',
                    error: err
                });
            }
            if (!university) {
                return res.status(404).json({
                    success:false,
                    message: 'No such university'
                });
            }
            universityPrimaryInformationModel.findOne({_id: university.universityPrimaryInformation}, async function (err, universityPrimaryInformation) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting universityPrimaryInformation',
                        error: err
                    });
                }

                if (!universityPrimaryInformation) {
                    universityPrimaryInformation = new universityPrimaryInformationModel({});   
                }

                universityPrimaryInformation.name = req.body.name ? req.body.name : universityPrimaryInformation.name;
                
                universityPrimaryInformation.state = req.body.state ? req.body.state : universityPrimaryInformation.state;
                universityPrimaryInformation.city = req.body.city ? req.body.city : universityPrimaryInformation.city;
                universityPrimaryInformation.country = req.body.country ? req.body.country : universityPrimaryInformation.country;
                universityPrimaryInformation.type = req.body.type ? req.body.type : universityPrimaryInformation.type;
                universityPrimaryInformation.pincode = req.body.pincode ? req.body.pincode : universityPrimaryInformation.pincode;
                universityPrimaryInformation.logo = req.body.logo ? req.body.logo : universityPrimaryInformation.logo;
                universityPrimaryInformation.address = req.body.address ? req.body.address : universityPrimaryInformation.address;
                universityPrimaryInformation.description = req.body.description ? req.body.description : universityPrimaryInformation.description;
                universityPrimaryInformation.coverPic = req.body.coverPic ? req.body.coverPic : universityPrimaryInformation.coverPic;
                universityPrimaryInformation.website = req.body.website ? req.body.website : universityPrimaryInformation.website;
                universityPrimaryInformation.phone = req.body.phone ? req.body.phone : universityPrimaryInformation.phone;
                universityPrimaryInformation.organization = req.body.organization ? req.body.organization : universityPrimaryInformation.organization;
                
                try{
                    await universityPrimaryInformation.save();
                    university.universityPrimaryInformation = universityPrimaryInformation._id;
                    console.log(universityPrimaryInformation)
                    university.save(function (err, university) {
                            if (err) {
                                return res.status(500).json({
                                    success:false,
                                    message: 'Error when updating university.',
                                    error: err
                                });
                            }
                            return res.json({
                            success:true,
                            message:"university Primary Details Updated"
                        });
                    });
                }
                catch(e){
                    return res.status(500).json({
                        success:false,
                        message: 'Error saving university information',
                        error: e
                    });
                }
            });
        });
    }
};
