var universityCourseModel = require('../models/universityCourseModel.js');
var universityModel = require('../models/universityModel');
/**
 * universityCourseController.js
 *
 * @description :: Server-side logic for managing universityCourses.
 */
module.exports = {

    /**
     * universityCourseController.list()
     */
    list: function (req, res) {
        
        var universityData = res.locals.university;
        
        universityCourseModel.find({_id:{$in:universityData.universityCourses}},function (err, universityCourses) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityCourse.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,universityCourses});
        });
    },

    /**
     * universityCourseController.show()
     */
    show: function (req, res) {
        
        var universityData = res.locals.university;
        var id = req.params.id;
        console.log(id,universityData)
        if(!universityData.universityCourses){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        console.log("hello world")
        if(!universityData.universityCourses.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        universityCourseModel.findOne({_id: id}, function (err, universityCourse) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityCourse.',
                    error: err
                });
            }

            if (!universityCourse) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityCourse'
                });
            }

            return res.status(200).json({
                success:true,
                universityCourse:universityCourse
            });
        });
    },

    /**
     * universityCourseController.create()
     */
    create: function (req, res) {
        
        var universityData = res.locals.university;

        var universityCourseData = new universityCourseModel({
			courseName : req.body.courseName,
			duration : req.body.duration,
			fee : req.body.fee,
			studyField : req.body.studyField,
			courseLevel : req.body.courseLevel,
			cgpa : req.body.cgpa,
			eligibility : req.body.eligibility,
			english : req.body.english,
			website : req.body.website,
			description : req.body.description,
			exam : req.body.exam,
            tuitionFee:req.body.tuitionFee,
            year : req.body.year,
            month : req.body.month
        });
        console.log("hello world")
        universityCourseData.save(function (err, universityCourse) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating universityCourse',
                    error: err
                });
            }
            universityModel.findOne({_id:universityData._id},async (err,university)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating course in university',
                        error: err
                    });
                }
                if(!university){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding university',
                    });
                }
                if(!university.universityCourses){
                    university.universityCourses = [];
                }
                university.universityCourses.push(universityCourse._id)
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
     * universityCourseController.update()
     */
    update: function (req, res) {

        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityCourses == null){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        if(!universityData.universityCourses.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        universityCourseModel.findOne({_id: id}, function (err, universityCourse) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityCourse',
                    error: err
                });
            }

            if (!universityCourse) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityCourse'
                });
            }

            universityCourse.courseName = req.body.courseName ? req.body.courseName : universityCourse.courseName;
			universityCourse.duration = req.body.duration ? req.body.duration : universityCourse.duration;
			universityCourse.fee = req.body.fee ? req.body.fee : universityCourse.fee;
			universityCourse.studyField = req.body.studyField ? req.body.studyField : universityCourse.studyField;
			universityCourse.courseLevel = req.body.courseLevel ? req.body.courseLevel : universityCourse.courseLevel;
			universityCourse.cgpa = req.body.cgpa ? req.body.cgpa : universityCourse.cgpa;
			universityCourse.eligibility = req.body.eligibility ? req.body.eligibility : universityCourse.eligibility;
			universityCourse.english = req.body.english ? req.body.english : universityCourse.english;
			universityCourse.website = req.body.website ? req.body.website : universityCourse.website;
			universityCourse.description = req.body.description ? req.body.description : universityCourse.description;
			universityCourse.exam = req.body.exam ? req.body.exam : universityCourse.exam;
			universityCourse.tuitionFee = req.body.tuitionFee ? req.body.tuitionFee : universityCourse.tuitionFee;
			universityCourse.year = req.body.year ? req.body.year : universityCourse.year;
			universityCourse.month = req.body.month ? req.body.month : universityCourse.month;
			
            universityCourse.save(function (err, universityCourse) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating universityCourse.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the course"});
            });
        });
    },

    /**
     * universityCourseController.remove()
     */
    remove: function (req, res) {

        
        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityCourses == null){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        if(!universityData.universityCourses.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        universityCourseModel.findByIdAndRemove(id, function (err, universityCourse) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the universityCourse.',
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
