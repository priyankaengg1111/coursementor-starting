const adminCountryModel = require('../models/adminCountryModel.js');
var studentApplicationModel = require('../models/studentApplicationModel.js');
var studentModel = require('../models/studentModel');
const universityCourseModel = require('../models/universityCourseModel.js');
const universityModel = require('../models/universityModel.js');

/**
 * studentApplicationController.js
 *
 * @description :: Server-side logic for managing studentApplications.
 */
module.exports = {

    /**
     * studentApplicationController.list()
     */
    list: function (req, res) {
        
        var studentData = res.locals.student;
        
        studentApplicationModel.find({_id:{$in:studentData.studentApplications}},function (err, studentApplications) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentApplication.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,studentApplications});
        });
    },

    /**
     * studentApplicationController.show()
     */
    show: function (req, res) {
        
        var studentData = res.locals.student;
        var id = req.params.id;
        console.log(id,studentData)
        if(!studentData.studentApplications){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Applications find in user data',
            });
        }

        console.log("hello world")
        if(!studentData.studentApplications.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Applications find in user data',
            });
        }

        studentApplicationModel.findOne({_id: id}, function (err, studentApplication) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentApplication.',
                    error: err
                });
            }

            if (!studentApplication) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentApplication'
                });
            }

            return res.status(200).json({
                success:true,
                studentApplication:studentApplication
            });
        });
    },

    /**
     * studentApplicationController.create()
     */
    create: async function (req, res) {
        
        var studentData = res.locals.student;

        var university = await universityModel.findOne({_id: req.body.universityID})
        var course = await universityCourseModel.findOne({_id: req.body.courseID});
        var country = await adminCountryModel.findOne({country : req.body.country});

        if(!course){
            return res.status(400).json({
                success:false,
                message:"No university course found"
            })
        }

        if(!university){
            return res.status(400).json({
                success:false,
                message:"No university found"
            })
        }

        if(!country){
            return res.status(400).json({
                success:false,
                message:"No Country found"
            })
        }

        var studentApplicationData = new studentApplicationModel({
            universityID : req.body.universityID,
			courseID : req.body.courseID,
			session : req.body.session,
			applicationProgress : req.body.applicationProgress,
            country : req.body.country,
            countryID : country._id,
            studentID : studentData._id,
            studentName : studentData.name,
            studentEmail : studentData.email,
            studentPhoneNo : studentData.phone,  
            universityName : university.name,
            courseName : course.courseName      
        });

        console.log("hello world")
        studentApplicationData.save(function (err, studentApplication) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating studentApplication',
                    error: err
                });
            }
            studentModel.findOne({_id:studentData._id},async (err,student)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Application in student',
                        error: err
                    });
                }
                if(!student){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding student',
                    });
                }
                if(!student.studentApplications){
                    student.studentApplications = [];
                }
                student.studentApplications.push(studentApplication._id)
                console.log(student)
                try{
                    await student.save();
                    return res.status(200).json({
                        success:true,
                        message: 'Saved Mongo Db Data',
                    });
                }
                catch(e){
                    console.log(e)
                    return res.status(200).json({
                        success:false,
                        message: 'Error in Saving student',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * studentApplicationController.update()
     */
    update: function (req, res) {

        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentApplications == null){
            return res.status(502).json({
                success:false,
                message: 'No Applications find in user data',
            });
        }

        if(!studentData.studentApplications.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Applications find in user data',
            });
        }

        studentApplicationModel.findOne({_id: id}, function (err, studentApplication) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentApplication',
                    error: err
                });
            }

            if (!studentApplication) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentApplication'
                });
            }

            studentApplication.universityID = req.body.universityID ? req.body.universityID : studentApplication.universityID;
			studentApplication.courseID = req.body.courseID ? req.body.courseID : studentApplication.courseID;
			studentApplication.session = req.body.session ? req.body.session : studentApplication.session;
			studentApplication.applicationProgress = req.body.applicationProgress ? req.body.applicationProgress : studentApplication.applicationProgress;
            studentApplication.country = req.body.country ? req.body.country : studentApplication.country;
            studentApplication.save(function (err, studentApplication) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating studentApplication.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Application"});
            });
        });
    },

    /**
     * studentApplicationController.remove()
     */
    remove: function (req, res) {

        
        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentApplications == null){
            return res.status(502).json({
                success:false,
                message: 'No Applications find in user data',
            });
        }

        if(!studentData.studentApplications.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Applications find in user data',
            });
        }

        studentApplicationModel.findByIdAndRemove(id, function (err, studentApplication) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the studentApplication.',
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
