var universityCommissionModel = require('../models/universityCommissionModel.js');
var universityModel = require('../models/universityModel');
/**
 * universityCommissionController.js
 *
 * @description :: Server-side logic for managing universityCommissions.
 */
module.exports = {

    /**
     * universityCommissionController.list()
     */
    list: function (req, res) {
        
        var universityData = res.locals.university;
        
        universityCommissionModel.find({_id:{$in:universityData.universityCommissions}},function (err, universityCommissions) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityCommission.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,universityCommissions});
        });
    },

    /**
     * universityCommissionController.show()
     */
    show: function (req, res) {
        
        var universityData = res.locals.university;
        var id = req.params.id;
        console.log(id,universityData)
        if(!universityData.universityCommissions){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        console.log("hello world")
        if(!universityData.universityCommissions.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        universityCommissionModel.findOne({_id: id}, function (err, universityCommission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityCommission.',
                    error: err
                });
            }

            if (!universityCommission) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityCommission'
                });
            }

            return res.status(200).json({
                success:true,
                universityCommission:universityCommission
            });
        });
    },

    /**
     * universityCommissionController.create()
     */
    create: function (req, res) {
        
        var universityData = res.locals.university;

        var universityCommissionData = new universityCommissionModel({
			courseName : req.body.courseName,
			fee : req.body.fee,
			commissionType : req.body.commissionType,
			commissionValue : req.body.commissionValue,
			timeType : req.body.timeType,
			timeValue : req.body.timeValue
        });
        console.log("hello world")
        universityCommissionData.save(function (err, universityCommission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating universityCommission',
                    error: err
                });
            }
            universityModel.findOne({_id:universityData._id},async (err,university)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Commission in university',
                        error: err
                    });
                }
                if(!university){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding university',
                    });
                }
                if(!university.universityCommissions || !university.universityCommissions.length){
                    university.universityCommissions = [];
                    console.log("working")
                }
                university.universityCommissions.push(universityCommission._id)
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
     * universityCommissionController.update()
     */
    update: function (req, res) {

        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityCommissions == null){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        if(!universityData.universityCommissions.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        universityCommissionModel.findOne({_id: id}, function (err, universityCommission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityCommission',
                    error: err
                });
            }

            if (!universityCommission) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityCommission'
                });
            }

            universityCommission.courseName = req.body.courseName ? req.body.courseName : universityCommission.courseName;
			universityCommission.fee = req.body.fee ? req.body.fee : universityCommission.fee;
			universityCommission.commissionType = req.body.commissionType ? req.body.commissionType : universityCommission.commissionType;
			universityCommission.commissionValue = req.body.commissionValue ? req.body.commissionValue : universityCommission.commissionValue;
			universityCommission.timeType = req.body.timeType ? req.body.timeType : universityCommission.timeType;
			universityCommission.timeValue = req.body.timeValue ? req.body.timeValue : universityCommission.timeValue;
			
            universityCommission.save(function (err, universityCommission) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating universityCommission.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Commission"});
            });
        });
    },

    /**
     * universityCommissionController.remove()
     */
    remove: function (req, res) {

        
        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityCommissions == null){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        if(!universityData.universityCommissions.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        universityCommissionModel.findByIdAndRemove(id, function (err, universityCommission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the universityCommission.',
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
