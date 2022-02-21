var studentExperienceDocumentModel = require('../models/studentExperienceDocumentModel.js');
var studentModel = require('../models/studentModel')
/**
 * studentExperienceDocumentController.js
 *
 * @description :: Server-side logic for managing studentExperienceDocuments.
 */
module.exports = {

    /**
     * studentExperienceDocumentController.list()
     */
    list: function (req, res) {
        studentExperienceDocumentModel.find(function (err, studentExperienceDocuments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentExperienceDocument.',
                    error: err
                });
            }

            return res.json(studentExperienceDocuments);
        });
    },

    /**
     * studentExperienceDocumentController.show()
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
                var studentExperienceDocument = await studentExperienceDocumentModel.findOne({_id:student.studentExperienceDocument});
                return res.json({
                    success:true,
                    studentExperienceDocument:studentExperienceDocument
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
     * studentExperienceDocumentController.create()
     */
    create: function (req, res) {
        var studentExperienceDocument = new studentExperienceDocumentModel({
			companyName : req.body.companyName,
			document : req.body.document,
			action : req.body.action,
			workStatus : req.body.workStatus,
			workType : req.body.workType,
			organization : req.body.organization,
			start : req.body.start,
			ended : req.body.ended,
			designation : req.body.designation,
			role : req.body.role,
			country : req.body.country,
			city : req.body.city
        });

        studentExperienceDocument.save(function (err, studentExperienceDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating studentExperienceDocument',
                    error: err
                });
            }

            return res.status(201).json(studentExperienceDocument);
        });
    },

    /**
     * studentExperienceDocumentController.update()
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
            studentExperienceDocumentModel.findOne({_id: student.studentExperienceDocument}, async function (err, studentExperienceDocument) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting studentExperienceDocument',
                        error: err
                    });
                }

                if (!studentExperienceDocument) {
                    studentExperienceDocument = new studentExperienceDocumentModel()
                }

                studentExperienceDocument.companyName = req.body.companyName ? req.body.companyName : studentExperienceDocument.companyName;
                studentExperienceDocument.document = req.body.document ? req.body.document : studentExperienceDocument.document;
                studentExperienceDocument.action = req.body.action ? req.body.action : studentExperienceDocument.action;
                studentExperienceDocument.workStatus = req.body.workStatus ? req.body.workStatus : studentExperienceDocument.workStatus;
                studentExperienceDocument.workType = req.body.workType ? req.body.workType : studentExperienceDocument.workType;
                studentExperienceDocument.organization = req.body.organization ? req.body.organization : studentExperienceDocument.organization;
                studentExperienceDocument.start = req.body.start ? req.body.start : studentExperienceDocument.start;
                studentExperienceDocument.ended = req.body.ended ? req.body.ended : studentExperienceDocument.ended;
                studentExperienceDocument.designation = req.body.designation ? req.body.designation : studentExperienceDocument.designation;
                studentExperienceDocument.role = req.body.role ? req.body.role : studentExperienceDocument.role;
                studentExperienceDocument.country = req.body.country ? req.body.country : studentExperienceDocument.country;
                studentExperienceDocument.city = req.body.city ? req.body.city : studentExperienceDocument.city;
                
                try{
                    await studentExperienceDocument.save();
                    student.studentExperienceDocument = studentExperienceDocument._id;
                    console.log(studentExperienceDocument)
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
                                message:"Student Experience Document Updated"
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
     * studentExperienceDocumentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentExperienceDocumentModel.findByIdAndRemove(id, function (err, studentExperienceDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentExperienceDocument.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
