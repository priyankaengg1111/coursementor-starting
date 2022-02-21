var studentExtraCurricularDocumentModel = require('../models/studentExtraCurricularDocumentModel.js');
var studentModel = require('../models/studentModel')
/**
 * studentExtraCurricularDocumentController.js
 *
 * @description :: Server-side logic for managing studentExtraCurricularDocuments.
 */
module.exports = {

    /**
     * studentExtraCurricularDocumentController.list()
     */
    list: function (req, res) {
        studentExtraCurricularDocumentModel.find(function (err, studentExtraCurricularDocuments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentExtraCurricularDocument.',
                    error: err
                });
            }

            return res.json(studentExtraCurricularDocuments);
        });
    },

    /**
     * studentExtraCurricularDocumentController.show()
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
                var studentExtraCurricularDocument = await studentExtraCurricularDocumentModel.findOne({_id:student.studentExtraCurricularDocument});
                return res.json({
                    success:true,
                    studentExtraCurricularDocument:studentExtraCurricularDocument
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
     * studentExtraCurricularDocumentController.create()
     */
    create: function (req, res) {
        var studentExtraCurricularDocument = new studentExtraCurricularDocumentModel({
			activity : req.body.activity,
			file : req.body.file
        });

        studentExtraCurricularDocument.save(function (err, studentExtraCurricularDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating studentExtraCurricularDocument',
                    error: err
                });
            }

            return res.status(201).json(studentExtraCurricularDocument);
        });
    },

    /**
     * studentExtraCurricularDocumentController.update()
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

            studentExtraCurricularDocumentModel.findOne({_id: student.studentExtraCurricularDocument}, async function (err, studentExtraCurricularDocument) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting studentExtraCurricularDocument',
                        error: err
                    });
                }

                if (!studentExtraCurricularDocument) {
                    studentExtraCurricularDocument = new studentExtraCurricularDocumentModel()
                }

                studentExtraCurricularDocument.activity = req.body.activity ? req.body.activity : studentExtraCurricularDocument.activity;
                studentExtraCurricularDocument.file = req.body.file ? req.body.file : studentExtraCurricularDocument.file;
                
                try{
                    await studentExtraCurricularDocument.save();
                    student.studentExtraCurricularDocument = studentExtraCurricularDocument._id;
                    console.log(studentExtraCurricularDocument)
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
     * studentExtraCurricularDocumentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentExtraCurricularDocumentModel.findByIdAndRemove(id, function (err, studentExtraCurricularDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentExtraCurricularDocument.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
