'use strict';
var express = require('express');
var router = express.Router();
var studentController = require('../controllers/studentController.js');
var studentAddressController = require('../controllers/studentAddressController')
var {verifyStudentToken, verifyAdminToken} = require('../middleware/auth');
var {fileUpload} = require('../middleware/fileUpload')
const studentFamilyController = require('../controllers/studentFamilyController.js');
const studentPersonalInformationController = require('../controllers/studentPersonalInformationController.js');
const studentEducationController = require('../controllers/studentEducationController.js')
const studentScoreController = require('../controllers/studentScoreController')
const studentExperienceController = require('../controllers/studentExperienceController');
const studentPersonalDetailsController = require('../controllers/studentPersonalDetailsController.js');
const studentActivityController = require('../controllers/studentActivityController')
const studentProfileRecommendationController = require('../controllers/studentProfileRecommendationController')

const studentIdentityDocumentController = require('../controllers/studentIdentityDocumentController');
const studentEducationDocumentController = require('../controllers/studentEducationDocumentController')
const studentExperienceDocumentController = require('../controllers/studentExperienceDocumentController')
const studentEnglishProficiencyDocumentController = require('../controllers/studentEnglishProficiencyDocumentController')
const studentExtraCurricularDocumentController = require('../controllers/studentExtraCurricularDocumentController')
const studentRecommendationDocumentController = require('../controllers/studentRecommendationDocumentController')
const studentOtherDocumentController = require('../controllers/studentOtherDocumentController') 
const { Route53RecoveryCluster } = require('aws-sdk');
const studentFamilyRoutes = require('./studentFamilyRoutes')
const studentEducationRoutes = require('./studentEducationRoutes')
const studentExperienceRoutes = require('./studentExperienceRoutes')
const studentActivityRoutes = require('./studentActivityRoutes')
const studentProfileRecommendationRoutes = require('./studentProfileRecommendationRoutes')
const studentBookmarkController = require('../controllers/studentBookmarkController')
const studentApplicationController = require('../controllers/studentApplicationController')
const studentApplicationRoutes = require('./studentApplicationRoutes')
const studentBookmarkRoutes = require('./studentBookmarkRoutes')
const notificationModel = require('../models/notificationModel')
/**
 * @swagger
 * components:
 *  schemas:
 *     student:
 *          type: object
 *          properties:
 *              _id:
 *                  type:   string
 *                  description: user ID
 *              name:
 *                  type:   string
 *                  description: The name
 *              password:
 *                  type: string
 *                  description: auto generate password
 *              email:
 *                  type: string
 *                  description: user email
 *          required:
 *              - name
 *              - password
 *              - email                   
 */



/**
 * @swagger
 * /student/register:
 *  post:
 *    description: a post login request used to login the user.
 *    tags: [Student]
 *    parameters:
 *      - in: body
 *        name: email
 *        type: string
 *        required: true
 *        description: email string parameter
 *      - in: body
 *        name: phone
 *        type: string
 *        required: true
 *        description: phonr string parameter    
 *      - in: body
 *        name: name
 *        type: string
 *        required: true
 *        description: name string parameter
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                      type: boolean
 *                      description: true
 *                  message:
 *                      type: string
 *                      description: message 
 *                  student:
 *                      type: object
 *                      $ref: '#/components/schemas/student'     
 *      201:
 *        description: A successful response
 *        content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                      type: boolean
 *                      description: false
 *                  message:
 *                      type: string
 *                      description: message         
 */
router.post('/register',studentController.register);

/**
 * @swagger
 * /student/login:
 *  post:
 *    description: a post login request used to login the user.
 *    tags: [Student]
 *    parameters:
 *      - in: body
 *        name: email
 *        type: string
 *        required: true
 *        description: email string parameter
 *      - in: body
 *        name: password
 *        type: string
 *        required: true
 *        description: password string parameter    
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                      success:
 *                          type: boolean
 *                          description: true
 *                      message:
 *                          type: string
 *                          description: about the response
 *                      accessToken:
 *                          type: string
 *                          description: token to store for future
 *      201:
 *        description: Unable to Login
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                      success:
 *                          type: boolean
 *                          description: false
 *                      message:
 *                          type: string
 *                          description: about the response
 */
 router.post('/login',studentController.login);

/**
 * post
 */
router.post('/forgotPassword',studentController.forgotPassword)

/*
 * PUT
 */
router.put('/personalInformation',verifyStudentToken,studentPersonalInformationController.update);


router.get('/', verifyAdminToken,studentController.list);

/** 
 * GET
*/
router.get('/personalInformation',verifyStudentToken,studentPersonalInformationController.show);


router.get('/address',verifyStudentToken, studentAddressController.show);

router.post('/changePassword',verifyStudentToken,studentController.changePassword)
router.put('/address',verifyStudentToken,studentAddressController.update);

router.get('/score',verifyStudentToken,studentScoreController.show)
router.put('/score',verifyStudentToken,studentScoreController.update)

router.get('/personalDetails',verifyStudentToken, studentPersonalDetailsController.show);
router.put('/personalDetails',verifyStudentToken, fileUpload,studentPersonalDetailsController.update);



router.use('/experiences',verifyStudentToken,studentExperienceRoutes);
router.use('/families',verifyStudentToken, studentFamilyRoutes);
router.use('/educations',verifyStudentToken,studentEducationRoutes);
router.use('/activities',verifyStudentToken, studentActivityRoutes);
router.use('/bookmarks', verifyStudentToken, studentBookmarkRoutes)
router.use('/applications',verifyStudentToken, studentApplicationRoutes)
router.use('/profileRecommendations',verifyStudentToken, studentProfileRecommendationRoutes)

router.get('/identityDocument',verifyStudentToken,studentIdentityDocumentController.show)
router.put('/identityDocument',verifyStudentToken,fileUpload,studentIdentityDocumentController.update)


router.get('/educationDocument',verifyStudentToken,studentEducationDocumentController.show)
router.put('/educationDocument',verifyStudentToken,fileUpload,studentEducationDocumentController.update)

router.get('/experienceDocument',verifyStudentToken,studentExperienceDocumentController.show)
router.put('/experienceDocument',verifyStudentToken,fileUpload,studentExperienceDocumentController.update)

router.get('/englishProficiencyDocument',verifyStudentToken,studentEnglishProficiencyDocumentController.show);
router.put('/englishProficiencyDocument',verifyStudentToken,fileUpload,studentEnglishProficiencyDocumentController.update);

router.get('/extraCurricularDocument',verifyStudentToken,studentExtraCurricularDocumentController.show);
router.put('/extraCurricularDocument',verifyStudentToken,fileUpload,studentExtraCurricularDocumentController.update);

router.get('/recommendationDocument',verifyStudentToken,studentRecommendationDocumentController.show);
router.put('/recommendationDocument',verifyStudentToken,fileUpload,studentRecommendationDocumentController.update);

router.get('/otherDocument',verifyStudentToken,studentOtherDocumentController.show);
router.put('/otherDocument',verifyStudentToken,fileUpload,studentOtherDocumentController.update);


router.get('/messages', verifyStudentToken,(req,res)=>{
    var studentData = res.locals.student;
    console.log('messages');
    notificationModel.find({studentID:studentData._id,type:1},(err,notifications)=>{
        if(err){
            return res.status(400).json({
                success:false,
                message:"Some error occured in showing message list"
            })
        }
        return res.status(200).json({
            success:true,
            notifications
        })
    })
})

router.post('/messages', verifyStudentToken, async (req,res)=>{
    var studentData = res.locals.student;
    var notification = new notificationModel({
        studentID: studentData._id,
        message:req.body.message,
        type:0
    })
    try{
        await notification.save();
        res.status(200).json({
            message:"Message Sent",
            success: true
        })
    }
    catch(e){
        res.status(400).json({
            message:"Message not sent",
            error : e,
            success: false
        })
    }
})



/*
 * DELETE
 */
router.delete('/',verifyStudentToken, studentController.remove);

module.exports = router;
