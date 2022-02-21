var studentFamilyModel = require('../models/studentFamilyModel.js');
var studentModel = require('../models/studentModel');
/**
 * studentFamilyController.js
 *
 * @description :: Server-side logic for managing studentFamilies.
 */
module.exports = {

    /**
     * studentFamilyController.list()
     */
    list: function (req, res) {
        
        var studentData = res.locals.student;
        
        studentFamilyModel.find({_id:{$in:studentData.studentFamilies}},function (err, studentFamilies) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentFamily.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,studentFamilies});
        });
    },

    /**
     * studentFamilyController.show()
     */
    show: function (req, res) {
        
        var studentData = res.locals.student;
        var id = req.params.id;
        console.log(id,studentData)
        if(!studentData.studentFamilies){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Families find in user data',
            });
        }

        console.log("hello world")
        if(!studentData.studentFamilies.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Families find in user data',
            });
        }

        studentFamilyModel.findOne({_id: id}, function (err, studentFamily) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentFamily.',
                    error: err
                });
            }

            if (!studentFamily) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentFamily'
                });
            }

            return res.status(200).json({
                success:true,
                studentFamily:studentFamily
            });
        });
    },

    /**
     * studentFamilyController.create()
     */
    create: function (req, res) {
        
        var studentData = res.locals.student;

        var studentFamilyData = new studentFamilyModel({
			relationship : req.body.relationship ,
			salutation : req.body.salutation ,
			firstName : req.body.firstName ,
			middleName : req.body.middleName,
			lastName : req.body.lastName ,
			email : req.body.email,
			mobile : req.body.mobile,
			occupation : req.body.occupation,
			qualification : req.body.qualification
        });
        console.log("hello world")
        studentFamilyData.save(function (err, studentFamily) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating studentFamily',
                    error: err
                });
            }
            studentModel.findOne({_id:studentData._id},async (err,student)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Family in student',
                        error: err
                    });
                }
                if(!student){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding student',
                    });
                }
                if(!student.studentFamilies){
                    student.studentFamilies = [];
                }
                student.studentFamilies.push(studentFamily._id)
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
     * studentFamilyController.update()
     */
    update: function (req, res) {

        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentFamilies == null){
            return res.status(502).json({
                success:false,
                message: 'No Families find in user data',
            });
        }

        if(!studentData.studentFamilies.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Families find in user data',
            });
        }

        studentFamilyModel.findOne({_id: id}, function (err, studentFamily) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentFamily',
                    error: err
                });
            }

            if (!studentFamily) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentFamily'
                });
            }

            studentFamily.relationship = req.body.relationship ? req.body.relationship : studentFamily.relationship;
			studentFamily.salutation = req.body.salutation ? req.body.salutation : studentFamily.salutation;
			studentFamily.firstName = req.body.firstName ? req.body.firstName : studentFamily.firstName;
			studentFamily.middleName = req.body.middleName ? req.body.middleName : studentFamily.middleName;
			studentFamily.lastName = req.body.lastName ? req.body.lastName : studentFamily.lastName;
			studentFamily.email = req.body.email ? req.body.email : studentFamily.email;
			studentFamily.mobile = req.body.mobile ? req.body.mobile : studentFamily.mobile;
			studentFamily.occupation = req.body.occupation ? req.body.occupation : studentFamily.occupation;
			studentFamily.qualification = req.body.qualification ? req.body.qualification : studentFamily.qualification;
			
            studentFamily.save(function (err, studentFamily) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating studentFamily.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Family"});
            });
        });
    },

    /**
     * studentFamilyController.remove()
     */
    remove: function (req, res) {

        
        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentFamilies == null){
            return res.status(502).json({
                success:false,
                message: 'No Families find in user data',
            });
        }

        if(!studentData.studentFamilies.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Families find in user data',
            });
        }

        studentFamilyModel.findByIdAndRemove(id, function (err, studentFamily) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the studentFamily.',
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
