var studentIdentityDocumentModel = require('../models/studentIdentityDocumentModel.js');
var studentModel = require('../models/studentModel')
/**
 * studentIdentityDocumentController.js
 *
 * @description :: Server-side logic for managing studentIdentityDocuments.
 */
module.exports = {

    

    /**
     * studentIdentityDocumentController.show()
     */
    show: function (req, res) {
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
                var studentIdentityDocument = await studentIdentityDocumentModel.findOne({_id:student.studentIdentityDocument});
                return res.json({
                    success:true,
                    studentIdentityDocument:studentIdentityDocument
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
     * studentIdentityDocumentController.create()
     */
    create: function (req, res) {
        var studentIdentityDocument = new studentIdentityDocument({
			passport : req.body.passport,
			passportBack : req.body.passportBack,
			cv : req.body.cv
        });

        studentIdentityDocument.save(function (err, studentIdentityDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating studentIdentityDocument',
                    error: err
                });
            }

            return res.status(201).json(studentIdentityDocument);
        });
    },

    /**
     * studentIdentityDocumentController.update()
     */
    update: function (req, res) {
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

            studentIdentityDocumentModel.findOne({_id: student.studentIdentityDocument}, async function (err, studentIdentityDocument) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting studentIdentityDocument',
                        error: err
                    });
                }

                if (!studentIdentityDocument) {
                    studentIdentityDocument = new studentIdentityDocumentModel();
                }

                studentIdentityDocument.passport = req.body.passport ? req.body.passport : studentIdentityDocument.passport;
                studentIdentityDocument.passportBack = req.body.passportBack ? req.body.passportBack : studentIdentityDocument.passportBack;
                studentIdentityDocument.cv = req.body.cv ? req.body.cv : studentIdentityDocument.cv;
                
                if(req.body.passport=='*'){
                    studentIdentityDocument.passport = null
                }


                try{
                    await studentIdentityDocument.save();
                    student.studentIdentityDocument = studentIdentityDocument._id;
                    console.log(studentIdentityDocument)
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
                                message:"Student Identity Document Updated"
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
        })
    },

    /**
     * studentIdentityDocumentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentIdentityDocument.findByIdAndRemove(id, function (err, studentIdentityDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentIdentityDocument.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
