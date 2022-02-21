var studentExperienceModel = require('../models/studentExperienceModel.js');
var studentModel = require('../models/studentModel');
/**
 * studentExperienceController.js
 *
 * @description :: Server-side logic for managing studentExperiences.
 */
module.exports = {

    /**
     * studentExperienceController.list()
     */
    list: function (req, res) {
        
        var studentData = res.locals.student;
        
        studentExperienceModel.find({_id:{$in:studentData.studentExperiences}},function (err, studentExperiences) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentExperience.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,studentExperiences});
        });
    },

    /**
     * studentExperienceController.show()
     */
    show: function (req, res) {
        
        var studentData = res.locals.student;
        var id = req.params.id;
        console.log(id,studentData)
        if(!studentData.studentExperiences){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Experiences find in user data',
            });
        }

        console.log("hello world")
        if(!studentData.studentExperiences.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Experiences find in user data',
            });
        }

        studentExperienceModel.findOne({_id: id}, function (err, studentExperience) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentExperience.',
                    error: err
                });
            }

            if (!studentExperience) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentExperience'
                });
            }

            return res.status(200).json({
                success:true,
                studentExperience:studentExperience
            });
        });
    },

    /**
     * studentExperienceController.create()
     */
    create: function (req, res) {
        
        var studentData = res.locals.student;

        var studentExperienceData = new studentExperienceModel({
			status : req.body.status,
			type : req.body.type,
			organization : req.body.organization,
			designation : req.body.designation,
			role : req.body.role,
			started : req.body.started,
			ended : req.body.ended,
			country : req.body.country,
			city : req.body.city
        });
        console.log("hello world")
        studentExperienceData.save(function (err, studentExperience) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating studentExperience',
                    error: err
                });
            }
            studentModel.findOne({_id:studentData._id},async (err,student)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Experience in student',
                        error: err
                    });
                }
                if(!student){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding student',
                    });
                }
                if(!student.studentExperiences){
                    student.studentExperiences = [];
                }
                student.studentExperiences.push(studentExperience._id)
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
     * studentExperienceController.update()
     */
    update: function (req, res) {

        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentExperiences == null){
            return res.status(502).json({
                success:false,
                message: 'No Experiences find in user data',
            });
        }

        if(!studentData.studentExperiences.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Experiences find in user data',
            });
        }

        studentExperienceModel.findOne({_id: id}, function (err, studentExperience) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentExperience',
                    error: err
                });
            }

            if (!studentExperience) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentExperience'
                });
            }

            studentExperience.status = req.body.status ? req.body.status : studentExperience.status;
			studentExperience.type = req.body.type ? req.body.type : studentExperience.type;
			studentExperience.organization = req.body.organization ? req.body.organization : studentExperience.organization;
			studentExperience.designation = req.body.designation ? req.body.designation : studentExperience.designation;
			studentExperience.role = req.body.role ? req.body.role : studentExperience.role;
			studentExperience.started = req.body.started ? req.body.started : studentExperience.started;
			studentExperience.ended = req.body.ended ? req.body.ended : studentExperience.ended;
			studentExperience.country = req.body.country ? req.body.country : studentExperience.country;
			studentExperience.city = req.body.city ? req.body.city : studentExperience.city;
			
            studentExperience.save(function (err, studentExperience) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating studentExperience.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Experience"});
            });
        });
    },

    /**
     * studentExperienceController.remove()
     */
    remove: function (req, res) {

        
        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentExperiences == null){
            return res.status(502).json({
                success:false,
                message: 'No Experiences find in user data',
            });
        }

        if(!studentData.studentExperiences.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Experiences find in user data',
            });
        }

        studentExperienceModel.findByIdAndRemove(id, function (err, studentExperience) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the studentExperience.',
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
