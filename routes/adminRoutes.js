var express = require('express');
var router = express.Router();
var {verifyAdminToken, verifyAdminStudentConversion} = require('../middleware/auth')
var adminController = require('../controllers/adminController.js');
var adminApplicationController = require('./adminApplicationRoutes')
var adminEnglishProficiencyRoutes = require('./adminEnglishProficiencyRoutes')
var adminStudyRoutes = require('./adminStudyRoutes')

var adminApplicationRoutes = require('./adminApplicationRoutes')
var adminDocumentRoutes = require('./adminDocumentRoutes')
var adminScholarshipRoutes = require('./adminScholarshipRoutes')
var studentRoutes = require('./studentRoutes');
const studentController = require('../controllers/studentController');
var studentApplicationModel = require('../models/studentApplicationModel')
var adminCountryRoutes = require('./adminCountryRoutes')
var notificationModel = require('../models/notificationModel')
var studentModel = require('../models/studentModel')
var email = require('../middleware/email')
/*
 * POST
 */
router.post('/login', adminController.login)

/*
 * POST
 */
router.post('/register',adminController.register);

/*
 * POST
 */
router.post('/forgotPassword',adminController.forgotPassword)

/*
 * POST
 */
router.post('/changePassword',verifyAdminToken, adminController.changePassword)


router.use('/applications',adminApplicationRoutes);
router.use('/EnglishProficiencies', adminEnglishProficiencyRoutes);
router.use('/Studies', adminStudyRoutes);

router.use('/documents',adminDocumentRoutes);

router.use('/scholarships', adminScholarshipRoutes);

router.use('/students/:id',verifyAdminToken, verifyAdminStudentConversion, studentRoutes);
router.use('/students',verifyAdminToken,studentController.list)



router.use('/countries', verifyAdminToken, adminCountryRoutes);


router.get('/studentApplications', verifyAdminToken,(req,res)=>{
    

    studentApplicationModel.find(
        {}
    ,(err,applications)=>{
        if(err){
          return  res.status(400).json({
                success:false,
                message:"Some error occurred",
                error:err
            })
        }

        var resArr = [];
        applications.filter(function(item){
            var i = resArr.findIndex(x => (x.studentID == item.studentID));
            console.log(i)
            if(i <= -1){
                resArr.push(item);
            }
            return null;
        });
    
        return res.status(200).json({
            success:true,
            applications : resArr});

    })
});

router.get('/studentApplications/:id', verifyAdminToken,(req,res)=>{
    

    studentApplicationModel.find(
        {studentID : req.params.id}
    ,(err,applications)=>{
        if(err){
          return  res.status(400).json({
                success:false,
                message:"Some error occurred",
                error:err
            })
        }
        return res.status(200).json({
            success:true,
            applications});

    })
});


router.get('/messages/:id',verifyAdminToken, (req,res)=>{

    notificationModel.find({studentID:req.params.id,type:0},(err,notifications)=>{
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

router.post('/messages/:id', verifyAdminToken, async (req,res)=>{
    
    var studentData = await studentModel.findOne({_id : req.params.id});

    console.log(studentData)

    var notification = new notificationModel({
        studentID: req.params.id,
        message:req.body.message,
        type:1
    })

    const message = {
        from:'noreply@coursementor.com',
        to: studentData.email,         // List of recipients
        subject: 'UniMentor Email', // Subject line
        text: `Hello You received message from admin : ${req.body.message}` // Plain text body
    };

    email.sendEmail(req,res,message);
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

router.get('/allStudents', verifyAdminToken, async (req,res)=>{

    studentModel.find({},{_id:1,name:1,email:1,phone:1,studentApplications:1},(err,students)=>{
        if(err){
            res.status(500).json({
                message:"some error",
                success: false
            })
        }
        return res.status(200).json({
            success:true,
            students
        })
    })

    
})




module.exports = router;
