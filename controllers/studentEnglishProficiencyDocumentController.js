var  studentEnglishProficiencyDocumentModel = require('../models/studentEnglishProficiencyDocumentModel.js');
var studentModel = require('../models/studentModel')
/**
 *  studentEnglishProficiencyDocumentController.js
 *
 * @description :: Server-side logic for managing  studentEnglishProficiencyDocuments.
 */
module.exports = {

    /**
     *  studentEnglishProficiencyDocumentController.list()
     */
    list: function (req, res) {
         studentEnglishProficiencyDocumentModel.find(function (err,  studentEnglishProficiencyDocuments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting  studentEnglishProficiencyDocument.',
                    error: err
                });
            }

            return res.json( studentEnglishProficiencyDocuments);
        });
    },

    /**
     *  studentEnglishProficiencyDocumentController.show()
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
                var studentEnglishProficiencyDocument = await studentEnglishProficiencyDocumentModel.findOne({_id:student.studentEnglishProficiencyDocument});
                return res.json({
                    success:true,
                    studentEnglishProficiencyDocument:studentEnglishProficiencyDocument
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
     *  studentEnglishProficiencyDocumentController.create()
     */
    create: function (req, res) {
        var  studentEnglishProficiencyDocument = new  studentEnglishProficiencyDocumentModel({
			test : req.body.test,
			file  : req.body.file 
        });

         studentEnglishProficiencyDocument.save(function (err,  studentEnglishProficiencyDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating  studentEnglishProficiencyDocument',
                    error: err
                });
            }

            return res.status(201).json( studentEnglishProficiencyDocument);
        });
    },

    /**
     *  studentEnglishProficiencyDocumentController.update()
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
            };

            studentEnglishProficiencyDocumentModel.findOne({_id: student.studentEnglishProficiencyDocument}, async function (err,  studentEnglishProficiencyDocument) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting  studentEnglishProficiencyDocument',
                        error: err
                    });
                }

                if (! studentEnglishProficiencyDocument) {
                    studentEnglishProficiencyDocument = new studentEnglishProficiencyDocumentModel({
                        test:'',
                        file:''
                    });
                }
                console.log(req.body)
                studentEnglishProficiencyDocument.test = req.body.test ? req.body.test :  studentEnglishProficiencyDocument.test;
                studentEnglishProficiencyDocument.file  = req.body.file  ? req.body.file  :  studentEnglishProficiencyDocument.file ;
                console.log(studentEnglishProficiencyDocument)
                try{
                    await studentEnglishProficiencyDocument.save();
                    student.studentEnglishProficiencyDocument = studentEnglishProficiencyDocument._id;
                    console.log(studentEnglishProficiencyDocument)
                    student.save(function (err, student) {
                            if (err) {
                                return res.status(500).json({
                                    success:false,
                                    message: 'Error when updating student.',
                                    error: err
                                });
                            }
                            return res.status(200).json({
                                success:true,
                                message:"Student English Proficiency Document Updated"
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
     *  studentEnglishProficiencyDocumentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

         studentEnglishProficiencyDocumentModel.findByIdAndRemove(id, function (err,  studentEnglishProficiencyDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the  studentEnglishProficiencyDocument.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
