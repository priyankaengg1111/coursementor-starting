var universityAdmissionModel = require('../models/universityAdmissionModel.js');
var universityModel = require('../models/universityModel');
/**
 * universityAdmissionController.js
 *
 * @description :: Server-side logic for managing universityAdmissions.
 */
module.exports = {

    /**
     * universityAdmissionController.list()
     */
    list: function (req, res) {
        
        var universityData = res.locals.university;
        res.locals.university = null;
        universityAdmissionModel.find({_id:{$in:universityData.universityAdmissions}},function (err, universityAdmissions) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityAdmission.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,universityAdmissions});
        });
    },

    /**
     * universityAdmissionController.show()
     */
    show: function (req, res) {
        
        var universityData = res.locals.university;
        res.locals.university = null;
        var id = req.params.id;
        console.log(id,universityData)
        if(!universityData.universityAdmissions){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Admissions find in user data',
            });
        }

        console.log("hello world")
        if(!universityData.universityAdmissions.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Admissions find in user data',
            });
        }

        universityAdmissionModel.findOne({_id: id}, function (err, universityAdmission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityAdmission.',
                    error: err
                });
            }

            if (!universityAdmission) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityAdmission'
                });
            }

            return res.status(200).json({
                success:true,
                universityAdmission:universityAdmission
            });
        });
    },

    /**
     * universityAdmissionController.create()
     */
    create: function (req, res) {
        
        var universityData = res.locals.university;
        res.locals.university = null;
        var universityAdmissionData = new universityAdmissionModel({
			point : req.body.point
        });
        console.log("hello world")
        universityAdmissionData.save(function (err, universityAdmission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating universityAdmission',
                    error: err
                });
            }
            universityModel.findOne({_id:universityData._id},async (err,university)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Admission in university',
                        error: err
                    });
                }
                if(!university){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding university',
                    });
                }
                if(!university.universityAdmissions){
                    university.universityAdmissions = [];
                }
                university.universityAdmissions.push(universityAdmission._id)
                console.log(university)
                try{
                    await university.save();
                    return res.status(200).json({
                        success:true,
                        message: 'Saved Mongo Db Data',
                    });
                }
                catch(e){
                    console.log(e)
                    return res.status(200).json({
                        success:false,
                        message: 'Error in Saving University',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * universityAdmissionController.update()
     */
    update: function (req, res) {

        var universityData = res.locals.university;
        res.locals.university = null;
        var id = req.params.id;
        if(universityData.universityAdmissions == null){
            return res.status(502).json({
                success:false,
                message: 'No Admissions find in user data',
            });
        }

        if(!universityData.universityAdmissions.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Admissions find in user data',
            });
        }

        universityAdmissionModel.findOne({_id: id}, function (err, universityAdmission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityAdmission',
                    error: err
                });
            }

            if (!universityAdmission) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityAdmission'
                });
            }

            universityAdmission.point = req.body.point ? req.body.point : universityAdmission.point
            universityAdmission.save(function (err, universityAdmission) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating universityAdmission.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Admission"});
            });
        });
    },

    /**
     * universityAdmissionController.remove()
     */
    remove: function (req, res) {

        
        var universityData = res.locals.university;
        res.locals.university = null;
        var id = req.params.id;
        if(universityData.universityAdmissions == null){
            return res.status(502).json({
                success:false,
                message: 'No Admissions find in user data',
            });
        }

        if(!universityData.universityAdmissions.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Admissions find in user data',
            });
        }

        universityAdmissionModel.findByIdAndRemove(id, function (err, universityAdmission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the universityAdmission.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,
                message:"Deleted Succesfully"
            });
        });
    }
};
