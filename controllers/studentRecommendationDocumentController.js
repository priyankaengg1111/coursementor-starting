var studentRecommendationDocumentModel = require('../models/studentRecommendationDocumentModel.js');
var studentModel = require('../models/studentModel')
/**
 * studentRecommendationDocumentController.js
 *
 * @description :: Server-side logic for managing studentRecommendationDocuments.
 */
module.exports = {

    /**
     * studentRecommendationDocumentController.list()
     */
    list: function (req, res) {
        studentRecommendationDocumentModel.find(function (err, studentRecommendationDocuments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentRecommendationDocument.',
                    error: err
                });
            }

            return res.json(studentRecommendationDocuments);
        });
    },

    /**
     * studentRecommendationDocumentController.show()
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
                var studentRecommendationDocument = await studentRecommendationDocumentModel.findOne({_id:student.studentRecommendationDocument});
                return res.json({
                    success:true,
                    studentRecommendationDocument:studentRecommendationDocument
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
     * studentRecommendationDocumentController.create()
     */
    create: function (req, res) {
        var studentRecommendationDocument = new studentRecommendationDocumentModel({
			name : req.body.name,
			document : req.body.document,
			action : req.body.action,
			referenceType : req.body.referenceType,
			organizationName : req.body.organizationName,
			recommenderName : req.body.recommenderName,
			email : req.body.email,
			recommenderRelation : req.body.recommenderRelation,
			recommenderDesignation : req.body.recommenderDesignation,
			number : req.body.number,
			address : req.body.address,
			recommendationLetter : req.body.recommendationLetter
        });

        studentRecommendationDocument.save(function (err, studentRecommendationDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating studentRecommendationDocument',
                    error: err
                });
            }

            return res.status(201).json(studentRecommendationDocument);
        });
    },

    /**
     * studentRecommendationDocumentController.update()
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

            studentRecommendationDocumentModel.findOne({_id: student.studentRecommendationDocument}, async function (err, studentRecommendationDocument) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting studentRecommendationDocument',
                        error: err
                    });
                }

                if (!studentRecommendationDocument) {
                    studentRecommendationDocument = new studentRecommendationDocumentModel()
                }

                studentRecommendationDocument.name = req.body.name ? req.body.name : studentRecommendationDocument.name;
                studentRecommendationDocument.document = req.body.document ? req.body.document : studentRecommendationDocument.document;
                studentRecommendationDocument.action = req.body.action ? req.body.action : studentRecommendationDocument.action;
                studentRecommendationDocument.referenceType = req.body.referenceType ? req.body.referenceType : studentRecommendationDocument.referenceType;
                studentRecommendationDocument.organizationName = req.body.organizationName ? req.body.organizationName : studentRecommendationDocument.organizationName;
                studentRecommendationDocument.recommenderName = req.body.recommenderName ? req.body.recommenderName : studentRecommendationDocument.recommenderName;
                studentRecommendationDocument.email = req.body.email ? req.body.email : studentRecommendationDocument.email;
                studentRecommendationDocument.recommenderRelation = req.body.recommenderRelation ? req.body.recommenderRelation : studentRecommendationDocument.recommenderRelation;
                studentRecommendationDocument.recommenderDesignation = req.body.recommenderDesignation ? req.body.recommenderDesignation : studentRecommendationDocument.recommenderDesignation;
                studentRecommendationDocument.number = req.body.number ? req.body.number : studentRecommendationDocument.number;
                studentRecommendationDocument.address = req.body.address ? req.body.address : studentRecommendationDocument.address;
                studentRecommendationDocument.recommendationLetter = req.body.recommendationLetter ? req.body.recommendationLetter : studentRecommendationDocument.recommendationLetter;
                
                try{
                    await studentRecommendationDocument.save();
                    student.studentRecommendationDocument = studentRecommendationDocument._id;
                    console.log(studentRecommendationDocument)
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
                                message:"Student Recommendation Document Updated"
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
     * studentRecommendationDocumentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentRecommendationDocumentModel.findByIdAndRemove(id, function (err, studentRecommendationDocument) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentRecommendationDocument.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
