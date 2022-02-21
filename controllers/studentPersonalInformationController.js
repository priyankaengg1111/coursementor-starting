var studentPersonalInformationModel = require('../models/studentPersonalInformationModel')
var StudentModel = require('../models/studentModel')
module.exports={
    show:function(req,res){
        console.log("hello world")
        var studentData = res.locals.student;
   
        
        StudentModel.findOne({_id:studentData._id},async (err,student)=>{
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
                var studentPersonalInformation = await studentPersonalInformationModel.findOne({_id:student.studentPersonalInformation});
                return res.json({
                    success:true,
                    studentPersonalInformation:studentPersonalInformation
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
    update:function(req,res){
        var studentData = res.locals.student;
        StudentModel.findOne({_id: studentData._id}, function (err, student) {
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
            studentPersonalInformationModel.findOne({_id:studentData.studentPersonalInformation},async (err,studentPersonalInformation)=>{
                if(err){
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting student personal information',
                        error: err
                    });
                }
                if (!studentPersonalInformation) {
            
                    studentPersonalInformation = new studentPersonalInformationModel({
                        salutation:req.body.salutation,
                        firstName:req.body.firstName
                    });
                }
                console.log(req.body)
                if(req.body.studentID){
                    studentPersonalInformation.studentID = req.body.studentID;
                }
                if(req.body.salutation){
                    studentPersonalInformation.salutation = req.body.salutation;
                }
                if(req.body.firstName){
                    studentPersonalInformation.firstName = req.body.firstName;
                }
                if(req.body.middleName){
                    studentPersonalInformation.middleName = req.body.middleName;
                }
                if(req.body.lastName){
                    studentPersonalInformation.lastName = req.body.lastName;
                }
                if(req.body.otherName){
                    studentPersonalInformation.otherName = req.body.otherName;
                }
                if(req.body.gender){
                    studentPersonalInformation.gender = req.body.gender;
                }
                if(req.body.dateOfBirth){
                    studentPersonalInformation.dateOfBirth = req.body.dateOfBirth;
                }
                if(req.body.countryOfBirth){
                    studentPersonalInformation.countryOfBirth = req.body.countryOfBirth;
                }
                if(req.body.nationality){
                    studentPersonalInformation.nationality = req.body.nationality
                }
                if(req.body.dualNationality){
                    studentPersonalInformation.dualNationality = req.body.dualNationality;
                }
                if(req.body.maritalStatus){
                    studentPersonalInformation.maritalStatus = req.body.maritalStatus;
                }   
                if(req.body.differentlyAble){
                    studentPersonalInformation.differentlyAble = req.body.differentlyAble;
                }
                if(req.body.passport){
                    studentPersonalInformation.passport = req.body.passport;
                }
                if(req.body.aadharCard){
                    studentPersonalInformation.aadharCard = req.body.aadharCard;
                }
                if(req.body.firstLanguage){
                    studentPersonalInformation.firstLanguage = req.body.firstLanguage;
                }
                if(req.body.visa){
                    studentPersonalInformation.visa = req.body.visa;
                }
                if(req.body.refusedVisa){
                    studentPersonalInformation.refusedVisa = req.body.refusedVisa;
                }
                try{
                    await studentPersonalInformation.save();
                    student.studentPersonalInformation = studentPersonalInformation._id;
                    console.log(studentPersonalInformation)
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
                            message:"Student Personal Information Updated"
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
            })  
        });
    }
}