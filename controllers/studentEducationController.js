var studentEducationModel = require('../models/studentEducationModel.js');
var studentModel = require('../models/studentModel');
/**
 * studentEducationController.js
 *
 * @description :: Server-side logic for managing studentEducations.
 */
module.exports = {

    /**
     * studentEducationController.list()
     */
    list: function (req, res) {
        
        var studentData = res.locals.student;
        
        studentEducationModel.find({_id:{$in:studentData.studentEducations}},function (err, studentEducations) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentEducation.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,studentEducations});
        });
    },

    /**
     * studentEducationController.show()
     */
    show: function (req, res) {
        
        var studentData = res.locals.student;
        var id = req.params.id;
        console.log(id,studentData)
        if(!studentData.studentEducations){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Educations find in user data',
            });
        }

        console.log("hello world")
        if(!studentData.studentEducations.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Educations find in user data',
            });
        }

        studentEducationModel.findOne({_id: id}, function (err, studentEducation) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentEducation.',
                    error: err
                });
            }

            if (!studentEducation) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentEducation'
                });
            }

            return res.status(200).json({
                success:true,
                studentEducation:studentEducation
            });
        });
    },

    /**
     * studentEducationController.create()
     */
    create: function (req, res) {
        
        var studentData = res.locals.student;

        var studentEducationData = new studentEducationModel({
			highestEducation : req.body.highestEducation,
			status : req.body.status,
			specialization : req.body.specialization,
			degree : req.body.degree,
			gradePercentage : req.body.gradePercentage,
			marks : req.body.marks,
			attendedForm : req.body.attendedForm,
			institution : req.body.institution,
			affiliationUniversity : req.body.affiliationUniversity,
			language : req.body.language,
			country : req.body.country,
			state : req.body.state,
			city : req.body.city,
			address : req.body.address,
			zipcode : req.body.zipcode
        });
        console.log("hello world")
        studentEducationData.save(function (err, studentEducation) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating studentEducation',
                    error: err
                });
            }
            studentModel.findOne({_id:studentData._id},async (err,student)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Education in student',
                        error: err
                    });
                }
                if(!student){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding student',
                    });
                }
                if(!student.studentEducations){
                    student.studentEducations = [];
                }
                student.studentEducations.push(studentEducation._id)
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
     * studentEducationController.update()
     */
    update: function (req, res) {

        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentEducations == null){
            return res.status(502).json({
                success:false,
                message: 'No Educations find in user data',
            });
        }

        if(!studentData.studentEducations.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Educations find in user data',
            });
        }

        studentEducationModel.findOne({_id: id}, function (err, studentEducation) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentEducation',
                    error: err
                });
            }

            if (!studentEducation) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentEducation'
                });
            }

            studentEducation.highestEducation = req.body.highestEducation ? req.body.highestEducation : studentEducation.highestEducation;
			studentEducation.status = req.body.status ? req.body.status : studentEducation.status;
			studentEducation.specialization = req.body.specialization ? req.body.specialization : studentEducation.specialization;
			studentEducation.degree = req.body.degree ? req.body.degree : studentEducation.degree;
			studentEducation.gradePercentage = req.body.gradePercentage ? req.body.gradePercentage : studentEducation.gradePercentage;
			studentEducation.marks = req.body.marks ? req.body.marks : studentEducation.marks;
			studentEducation.attendedForm = req.body.attendedForm ? req.body.attendedForm : studentEducation.attendedForm;
			studentEducation.institution = req.body.institution ? req.body.institution : studentEducation.institution;
			studentEducation.affiliationUniversity = req.body.affiliationUniversity ? req.body.affiliationUniversity : studentEducation.affiliationUniversity;
			studentEducation.language = req.body.language ? req.body.language : studentEducation.language;
			studentEducation.country = req.body.country ? req.body.country : studentEducation.country;
			studentEducation.state = req.body.state ? req.body.state : studentEducation.state;
			studentEducation.city = req.body.city ? req.body.city : studentEducation.city;
			studentEducation.address = req.body.address ? req.body.address : studentEducation.address;
			studentEducation.zipcode = req.body.zipcode ? req.body.zipcode : studentEducation.zipcode;
			
            studentEducation.save(function (err, studentEducation) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating studentEducation.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Education"});
            });
        });
    },

    /**
     * studentEducationController.remove()
     */
    remove: function (req, res) {

        
        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentEducations == null){
            return res.status(502).json({
                success:false,
                message: 'No Educations find in user data',
            });
        }

        if(!studentData.studentEducations.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Educations find in user data',
            });
        }

        studentEducationModel.findByIdAndRemove(id, function (err, studentEducation) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the studentEducation.',
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
