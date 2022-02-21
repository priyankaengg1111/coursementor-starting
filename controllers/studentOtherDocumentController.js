var studentOtherDocumentModel = require('../models/studentOtherDocumentModel.js');
var studentModel = require('../models/studentModel')
/**
 * studentOtherDocumentController.js
 *
 * @description :: Server-side logic for managing studentOtherDocuments.
 */
module.exports = {

    /**
     * studentOtherDocumentController.list()
     */
    list: function (req, res) {
        studentOtherDocumentModel.find(function (err, studentOtherDocuments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentOtherDocument.',
                    error: err
                });
            }

            return res.json(studentOtherDocuments);
        });
    },

    /**
     * studentOtherDocumentController.show()
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
                var studentOtherDocument = await studentOtherDocumentModel.findOne({_id:student.studentOtherDocument});
                return res.json({
                    success:true,
                    studentOtherDocument:studentOtherDocument
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
     * studentOtherDocumentController.create()
     */
    create: function (req, res) {
        var studentOtherDocument = new studentOtherDocumentModel({
			name : req.body.name,
			file : req.body.file
        });

        studentOtherDocument.save(function (err, studentOtherDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating studentOtherDocument',
                    error: err
                });
            }

            return res.status(201).json(studentOtherDocument);
        });
    },

    /**
     * studentOtherDocumentController.update()
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
            studentOtherDocumentModel.findOne({_id: student.studentOtherDocument}, async function (err, studentOtherDocument) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting studentOtherDocument',
                        error: err
                    });
                }

                if (!studentOtherDocument) {
                    studentOtherDocument = new studentOtherDocumentModel();
                }
                    
                studentOtherDocument.name = req.body.name ? req.body.name : studentOtherDocument.name;
                studentOtherDocument.file = req.body.file ? req.body.file : studentOtherDocument.file;
                
                try{
                    await studentOtherDocument.save();
                    student.studentOtherDocument = studentOtherDocument._id;
                    console.log(studentOtherDocument)
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
                                message:"Student Other Document Updated"
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
     * studentOtherDocumentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentOtherDocumentModel.findByIdAndRemove(id, function (err, studentOtherDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentOtherDocument.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
