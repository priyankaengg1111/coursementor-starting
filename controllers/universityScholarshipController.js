var universityScholarshipModel = require('../models/universityScholarshipModel.js');
var universityModel = require('../models/universityModel');
/**
 * universityScholarshipController.js
 *
 * @description :: Server-side logic for managing universityScholarships.
 */
module.exports = {

    /**
     * universityScholarshipController.list()
     */
    list: function (req, res) {
        
        var universityData = res.locals.university;
        res.locals.university = null;
        universityScholarshipModel.find({_id:{$in:universityData.universityScholarships}},function (err, universityScholarships) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityScholarship.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,universityScholarships});
        });
    },

    /**
     * universityScholarshipController.show()
     */
    show: function (req, res) {
        
        var universityData = res.locals.university;
        res.locals.university = null;
        var id = req.params.id;
        console.log(id,universityData)
        if(!universityData.universityScholarships){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Scholarships find in user data',
            });
        }

        console.log("hello world")
        if(!universityData.universityScholarships.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Scholarships find in user data',
            });
        }

        universityScholarshipModel.findOne({_id: id}, function (err, universityScholarship) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityScholarship.',
                    error: err
                });
            }

            if (!universityScholarship) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityScholarship'
                });
            }

            return res.status(200).json({
                success:true,
                universityScholarship:universityScholarship
            });
        });
    },

    /**
     * universityScholarshipController.create()
     */
    create: function (req, res) {
        
        var universityData = res.locals.university;
        res.locals.university = null;
        var universityScholarshipData = new universityScholarshipModel({
			scholarship : req.body.scholarship,
			
        });
        console.log("hello world")
        universityScholarshipData.save(function (err, universityScholarship) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating universityScholarship',
                    error: err
                });
            }
            universityModel.findOne({_id:universityData._id},async (err,university)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Scholarship in university',
                        error: err
                    });
                }
                if(!university){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding university',
                    });
                }
                if(!university.universityScholarships){
                    university.universityScholarships = [];
                }
                university.universityScholarships.push(universityScholarship._id)
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
     * universityScholarshipController.update()
     */
    update: function (req, res) {

        var universityData = res.locals.university;
        res.locals.university = null;
        var id = req.params.id;
        if(universityData.universityScholarships == null){
            return res.status(502).json({
                success:false,
                message: 'No Scholarships find in user data',
            });
        }

        if(!universityData.universityScholarships.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Scholarships find in user data',
            });
        }

        universityScholarshipModel.findOne({_id: id}, function (err, universityScholarship) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityScholarship',
                    error: err
                });
            }

            if (!universityScholarship) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityScholarship'
                });
            }

            universityScholarship.scholarship = req.body.scholarship ? req.body.scholarship : universityScholarship.scholarship;
			
            universityScholarship.save(function (err, universityScholarship) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating universityScholarship.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Scholarship"});
            });
        });
    },

    /**
     * universityScholarshipController.remove()
     */
    remove: function (req, res) {

        
        var universityData = res.locals.university;
        res.locals.university = null;
        var id = req.params.id;
        if(universityData.universityScholarships == null){
            return res.status(502).json({
                success:false,
                message: 'No Scholarships find in user data',
            });
        }

        if(!universityData.universityScholarships.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Scholarships find in user data',
            });
        }

        universityScholarshipModel.findByIdAndRemove(id, function (err, universityScholarship) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the universityScholarship.',
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
