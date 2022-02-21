var studentProfileRecommendationModel = require('../models/studentProfileRecommendationModel.js');
var studentModel = require('../models/studentModel');
/**
 * studentProfileRecommendationController.js
 *
 * @description :: Server-side logic for managing studentProfileRecommendations.
 */
module.exports = {

    /**
     * studentProfileRecommendationController.list()
     */
    list: function (req, res) {
        
        var studentData = res.locals.student;
        
        studentProfileRecommendationModel.find({_id:{$in:studentData.studentProfileRecommendations}},function (err, studentProfileRecommendations) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentProfileRecommendation.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,studentProfileRecommendations});
        });
    },

    /**
     * studentProfileRecommendationController.show()
     */
    show: function (req, res) {
        
        var studentData = res.locals.student;
        var id = req.params.id;
        console.log(id,studentData)
        if(!studentData.studentProfileRecommendations){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No ProfileRecommendations find in user data',
            });
        }

        console.log("hello world")
        if(!studentData.studentProfileRecommendations.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No ProfileRecommendations find in user data',
            });
        }

        studentProfileRecommendationModel.findOne({_id: id}, function (err, studentProfileRecommendation) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentProfileRecommendation.',
                    error: err
                });
            }

            if (!studentProfileRecommendation) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentProfileRecommendation'
                });
            }

            return res.status(200).json({
                success:true,
                studentProfileRecommendation:studentProfileRecommendation
            });
        });
    },

    /**
     * studentProfileRecommendationController.create()
     */
    create: function (req, res) {
        
        var studentData = res.locals.student;
        
        var studentProfileRecommendationData = new studentProfileRecommendationModel({
			type : req.body.type,
			organization : req.body.organization,
			recommenderName : req.body.recommenderName,
			email : req.body.email,
			relation : req.body.relation,
			designation : req.body.designation,
			number : req.body.number,
			address : req.body.address,
			letter : req.body.letter
        });
        console.log("hello world")
        studentProfileRecommendationData.save(function (err, studentProfileRecommendation) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating studentProfileRecommendation',
                    error: err
                });
            }
            studentModel.findOne({_id:studentData._id},async (err,student)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating ProfileRecommendation in student',
                        error: err
                    });
                }
                if(!student){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding student',
                    });
                }
                console.log("msklandkn dk")
                if(!student.studentProfileRecommendations){
                    student.studentProfileRecommendations = [];
                }
                student.studentProfileRecommendations.push(studentProfileRecommendation._id)
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
     * studentProfileRecommendationController.update()
     */
    update: function (req, res) {

        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentProfileRecommendations == null){
            return res.status(502).json({
                success:false,
                message: 'No ProfileRecommendations find in user data',
            });
        }

        if(!studentData.studentProfileRecommendations.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No ProfileRecommendations find in user data',
            });
        }

        studentProfileRecommendationModel.findOne({_id: id}, function (err, studentProfileRecommendation) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentProfileRecommendation',
                    error: err
                });
            }

            if (!studentProfileRecommendation) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentProfileRecommendation'
                });
            }

            studentProfileRecommendation.type = req.body.type ? req.body.type : studentProfileRecommendation.type;
			studentProfileRecommendation.organization = req.body.organization ? req.body.organization : studentProfileRecommendation.organization;
			studentProfileRecommendation.recommenderName = req.body.recommenderName ? req.body.recommenderName : studentProfileRecommendation.recommenderName;
			studentProfileRecommendation.email = req.body.email ? req.body.email : studentProfileRecommendation.email;
			studentProfileRecommendation.relation = req.body.relation ? req.body.relation : studentProfileRecommendation.relation;
			studentProfileRecommendation.designation = req.body.designation ? req.body.designation : studentProfileRecommendation.designation;
			studentProfileRecommendation.number = req.body.number ? req.body.number : studentProfileRecommendation.number;
			studentProfileRecommendation.address = req.body.address ? req.body.address : studentProfileRecommendation.address;
			studentProfileRecommendation.letter = req.body.letter ? req.body.letter : studentProfileRecommendation.letter;
			
            studentProfileRecommendation.save(function (err, studentProfileRecommendation) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating studentProfileRecommendation.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the ProfileRecommendation"});
            });
        });
    },

    /**
     * studentProfileRecommendationController.remove()
     */
    remove: function (req, res) {

        
        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentProfileRecommendations == null){
            return res.status(502).json({
                success:false,
                message: 'No ProfileRecommendations find in user data',
            });
        }

        if(!studentData.studentProfileRecommendations.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No ProfileRecommendations find in user data',
            });
        }

        studentProfileRecommendationModel.findByIdAndRemove(id, function (err, studentProfileRecommendation) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the studentProfileRecommendation.',
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
