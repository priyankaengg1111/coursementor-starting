var studentPersonalDetailsModel = require('../models/studentPersonalDetailsModel.js');
var studentModel = require('../models/studentModel')

/**
 * studentPersonalDetailsController.js
 *
 * @description :: Server-side logic for managing studentPersonalDetailss.
 */
module.exports = {

    /**
     * studentPersonalDetailsController.list()
     */
    list: function (req, res) {
        studentPersonalDetailsModel.find(function (err, studentPersonalDetailss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentPersonalDetails.',
                    error: err
                });
            }

            return res.json(studentPersonalDetailss);
        });
    },

    /**
     * studentPersonalDetailsController.show()
     */
     show:function(req,res){
        var studentData = res.locals.student;
   
        
        studentModel.findOne({_id:studentData._id},async (err,student)=>{
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting student',
                });
            }
            if (!student) {
                return res.status(404).json({
                    success:false,
                    message: 'No such student'
                });
            }
            try{
                var studentPersonalDetails = await studentPersonalDetailsModel.findOne({_id:student.studentPersonalDetails});
                console.log(studentPersonalDetails)
                return res.json({
                    success:true,
                    studentPersonalDetails:studentPersonalDetails
                });
            }
            catch(e){
                return res.status(404).json({
                    success:false,
                    message: 'Error to fetch student information',
                    error: e
                });
            }
        })
    },

    /**
     * studentPersonalDetailsController.create()
     */
    create: function (req, res) {
        var studentPersonalDetails = new studentPersonalDetailsModel({
			picture : req.body.picture,
			aboutMe : req.body.aboutMe,
			email : req.body.email,
			location : req.body.location,
			state : req.body.state,
			city : req.body.city,
			country : req.body.country,
			dateOfBirth : req.body.dateOfBirth,
			country : req.body.country,
			countryCode : req.body.countryCode,
			phone : req.body.phone,
			gender : req.body.gender
        });

        studentPersonalDetails.save(function (err, studentPersonalDetails) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating studentPersonalDetails',
                    error: err
                });
            }

            return res.status(201).json(studentPersonalDetails);
        });
    },

    /**
     * studentPersonalDetailsController.update()
     */
    update: function (req, res) {
        var studentData = res.locals.student;
        studentModel.findOne({_id: studentData._id}, function (err, student) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting student',
                    error: err
                });
            }
            if (!student) {
                return res.status(404).json({
                    success:false,
                    message: 'No such student'
                });
            }

            studentPersonalDetailsModel.findOne({_id: student.studentPersonalDetails}, async function (err, studentPersonalDetails) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting studentPersonalDetails',
                        error: err
                    });
                }

                if (!studentPersonalDetails) {
                    studentPersonalDetails = new studentPersonalDetailsModel();
                }

                if(req.body.picturePath){
                    console.log('working')
                    try{
                        const imageUploadResponse = await client.upload(req.body.picturePath);
                        if(!imageUploadResponse){
                            return res.status(500).json({
                                message:"Error in uploading file",
                                success:false
                            })       
                        }
                        req.body.picture = imageUploadResponse.url;
                    }          
                    catch(e){
                        console.log(e)
                        return res.status(500).json({
                            success:false,
                            message: 'Error uploading picture',
                            error: e
                        });
                    }
                }
                studentPersonalDetails.picture = req.body.picture ? req.body.picture : studentPersonalDetails.picture;
                studentPersonalDetails.aboutMe = req.body.aboutMe ? req.body.aboutMe : studentPersonalDetails.aboutMe;
                studentPersonalDetails.email = req.body.email ? req.body.email : studentPersonalDetails.email;
                studentPersonalDetails.location = req.body.location ? req.body.location : studentPersonalDetails.location;
                studentPersonalDetails.state = req.body.state ? req.body.state : studentPersonalDetails.state;
                studentPersonalDetails.city = req.body.city ? req.body.city : studentPersonalDetails.city;
                studentPersonalDetails.country = req.body.country ? req.body.country : studentPersonalDetails.country;
                studentPersonalDetails.dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : studentPersonalDetails.dateOfBirth;
                studentPersonalDetails.country = req.body.country ? req.body.country : studentPersonalDetails.country;
                studentPersonalDetails.countryCode = req.body.countryCode ? req.body.countryCode : studentPersonalDetails.countryCode;
                studentPersonalDetails.phone = req.body.phone ? req.body.phone : studentPersonalDetails.phone;
                studentPersonalDetails.gender = req.body.gender ? req.body.gender : studentPersonalDetails.gender;
                
                try{
                    await studentPersonalDetails.save();
                    student.studentPersonalDetails = studentPersonalDetails._id;
                    console.log(studentPersonalDetails)
                    student.save(function (err, student) {
                            if (err) {
                                return res.status(500).json({
                                    success:false,
                                    message: 'Error when updating student.',
                                    error: err
                                });
                            }
                            return res.json({
                            success:true,
                            message:"Student Personal Details Updated"
                        });
                    });
                }
                catch(e){
                    return res.status(500).json({
                        success:false,
                        message: 'Error saving student information',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * studentPersonalDetailsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentPersonalDetailsModel.findByIdAndRemove(id, function (err, studentPersonalDetails) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentPersonalDetails.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
