var studentEducationDocumentModel = require('../models/studentEducationDocumentModel.js');
var studentModel = require('../models/studentModel')
/**
 * studentEducationDocumentController.js
 *
 * @description :: Server-side logic for managing studentEducationDocuments.
 */
module.exports = {

    /**
     * studentEducationDocumentController.list()
     */
    list: function (req, res) {
        studentEducationDocumentModel.find(function (err, studentEducationDocuments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentEducationDocument.',
                    error: err
                });
            }

            return res.json(studentEducationDocuments);
        });
    },

    /**
     * studentEducationDocumentController.show()
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
                var studentEducationDocument = await studentEducationDocumentModel.findOne({_id:student.studentEducationDocument});
                return res.json({
                    success:true,
                    studentEducationDocument:studentEducationDocument
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
     * studentEducationDocumentController.create()
     */
    create: function (req, res) {
        var studentEducationDocument = new studentEducationDocumentModel({
			marksheet10 : req.body.marksheet10,
			marksheet12 : req.body.marksheet12,
			ugDegree : req.body.ugDegree,
			ugConsolidate : req.body.ugConsolidate,
			ugConsolidatedMarksheet : req.body.ugConsolidatedMarksheet,
			ugMarksheet : req.body.ugMarksheet,
			pgDegree : req.body.pgDegree,
			pgDegreeConsolidatedMarksheet : req.body.pgDegreeConsolidatedMarksheet,
			pgMarksheet : req.body.pgMarksheet
        });

        studentEducationDocument.save(function (err, studentEducationDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating studentEducationDocument',
                    error: err
                });
            }

            return res.status(201).json(studentEducationDocument);
        });
    },

    /**
     * studentEducationDocumentController.update()
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


            studentEducationDocumentModel.findOne({_id: student.studentEducationDocument}, async function (err, studentEducationDocument) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting studentEducationDocument',
                        error: err
                    });
                }

                if (!studentEducationDocument) {
                    studentEducationDocument = new studentEducationDocumentModel();
                }

                studentEducationDocument.marksheet10 = req.body.marksheet10 ? req.body.marksheet10 : studentEducationDocument.marksheet10;
                studentEducationDocument.marksheet12 = req.body.marksheet12 ? req.body.marksheet12 : studentEducationDocument.marksheet12;
                studentEducationDocument.ugDegree = req.body.ugDegree ? req.body.ugDegree : studentEducationDocument.ugDegree;
                studentEducationDocument.ugConsolidate = req.body.ugConsolidate ? req.body.ugConsolidate : studentEducationDocument.ugConsolidate;
                studentEducationDocument.ugConsolidatedMarksheet = req.body.ugConsolidatedMarksheet ? req.body.ugConsolidatedMarksheet : studentEducationDocument.ugConsolidatedMarksheet;
                studentEducationDocument.ugMarksheet = req.body.ugMarksheet ? req.body.ugMarksheet : studentEducationDocument.ugMarksheet;
                studentEducationDocument.pgDegree = req.body.pgDegree ? req.body.pgDegree : studentEducationDocument.pgDegree;
                studentEducationDocument.pgDegreeConsolidatedMarksheet = req.body.pgDegreeConsolidatedMarksheet ? req.body.pgDegreeConsolidatedMarksheet : studentEducationDocument.pgDegreeConsolidatedMarksheet;
                studentEducationDocument.pgMarksheet = req.body.pgMarksheet ? req.body.pgMarksheet : studentEducationDocument.pgMarksheet;
                
                try{
                    await studentEducationDocument.save();
                    student.studentEducationDocument = studentEducationDocument._id;
                    console.log(studentEducationDocument)
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
                                message:"Student Education Document Updated"
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
     * studentEducationDocumentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentEducationDocumentModel.findByIdAndRemove(id, function (err, studentEducationDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentEducationDocument.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
