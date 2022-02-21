var universityIntakeModel = require('../models/universityIntakeModel.js');
var universityModel = require('../models/universityModel');
/**
 * universityIntakeController.js
 *
 * @description :: Server-side logic for managing universityIntakes.
 */
module.exports = {

    /**
     * universityIntakeController.list()
     */
    list: function (req, res) {
        
        var universityData = res.locals.university;
        
        universityIntakeModel.find({_id:{$in:universityData.universityIntakes}},function (err, universityIntakes) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityIntake.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,universityIntakes});
        });
    },

    /**
     * universityIntakeController.show()
     */
    show: function (req, res) {
        
        var universityData = res.locals.university;
        var id = req.params.id;
        console.log(id,universityData)
        if(!universityData.universityIntakes){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Intakes find in user data',
            });
        }

        console.log("hello world")
        if(!universityData.universityIntakes.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Intakes find in user data',
            });
        }

        universityIntakeModel.findOne({_id: id}, function (err, universityIntake) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityIntake.',
                    error: err
                });
            }

            if (!universityIntake) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityIntake'
                });
            }

            return res.status(200).json({
                success:true,
                universityIntake:universityIntake
            });
        });
    },

    /**
     * universityIntakeController.create()
     */
    create: function (req, res) {
        
        var universityData = res.locals.university;

        var universityIntakeData = new universityIntakeModel({
            year : req.body.year,
			month : req.body.month
        });
        console.log("hello world")
        universityIntakeData.save(function (err, universityIntake) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating universityIntake',
                    error: err
                });
            }
            universityModel.findOne({_id:universityData._id},async (err,university)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Intake in university',
                        error: err
                    });
                }
                if(!university){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding university',
                    });
                }
                if(!university.universityIntakes){
                    university.universityIntakes = [];
                }
                university.universityIntakes.push(universityIntake._id)
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
     * universityIntakeController.update()
     */
    update: function (req, res) {

        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityIntakes == null){
            return res.status(502).json({
                success:false,
                message: 'No Intakes find in user data',
            });
        }

        if(!universityData.universityIntakes.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Intakes find in user data',
            });
        }

        universityIntakeModel.findOne({_id: id}, function (err, universityIntake) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityIntake',
                    error: err
                });
            }

            if (!universityIntake) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityIntake'
                });
            }

            universityIntake.year = req.body.year ? req.body.year : universityIntake.year;
			universityIntake.month = req.body.month ? req.body.month : universityIntake.month;
			
            universityIntake.save(function (err, universityIntake) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating universityIntake.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Intake"});
            });
        });
    },

    /**
     * universityIntakeController.remove()
     */ 
    remove: function (req, res) {

        
        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityIntakes == null){
            return res.status(502).json({
                success:false,
                message: 'No Intakes find in user data',
            });
        }

        if(!universityData.universityIntakes.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Intakes find in user data',
            });
        }

        universityIntakeModel.findByIdAndRemove(id, function (err, universityIntake) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the universityIntake.',
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
