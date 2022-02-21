var studentActivityModel = require('../models/studentActivityModel.js');
var studentModel = require('../models/studentModel');
/**
 * studentActivityController.js
 *
 * @description :: Server-side logic for managing studentActivities.
 */
module.exports = {

    /**
     * studentActivityController.list()
     */
    list: function (req, res) {
        
        var studentData = res.locals.student;
        
        studentActivityModel.find({_id:{$in:studentData.studentActivities}},function (err, studentActivities) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentActivity.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,studentActivities});
        });
    },

    /**
     * studentActivityController.show()
     */
    show: function (req, res) {
        
        var studentData = res.locals.student;
        var id = req.params.id;
        console.log(id,studentData)
        if(!studentData.studentActivities){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Activities find in user data',
            });
        }

        console.log("hello world")
        if(!studentData.studentActivities.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Activities find in user data',
            });
        }

        studentActivityModel.findOne({_id: id}, function (err, studentActivity) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentActivity.',
                    error: err
                });
            }

            if (!studentActivity) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentActivity'
                });
            }

            return res.status(200).json({
                success:true,
                studentActivity:studentActivity
            });
        });
    },

    /**
     * studentActivityController.create()
     */
    create: function (req, res) {
        
        var studentData = res.locals.student;

        var studentActivityData = new studentActivityModel({
            Activitiestatus : req.body.Activitiestatus,
			activity : req.body.activity,
			position : req.body.position,
			description : req.body.description,
			started : req.body.started,
			ended : req.body.ended,
			apply : req.body.apply
        });
        console.log("hello world")
        studentActivityData.save(function (err, studentActivity) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating studentActivity',
                    error: err
                });
            }
            studentModel.findOne({_id:studentData._id},async (err,student)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Activity in student',
                        error: err
                    });
                }
                if(!student){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding student',
                    });
                }
                if(!student.studentActivities){
                    student.studentActivities = [];
                }
                student.studentActivities.push(studentActivity._id)
                console.log(student)
                try{
                    await student.save();
                    return res.status(200).json({
                        success:true,
                        message: 'Saved Mongo Db Data',
                    });
                }
                catch(e){
                    console.log(e)
                    return res.status(200).json({
                        success:false,
                        message: 'Error in Saving student',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * studentActivityController.update()
     */
    update: function (req, res) {

        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentActivities == null){
            return res.status(502).json({
                success:false,
                message: 'No Activities find in user data',
            });
        }

        if(!studentData.studentActivities.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Activities find in user data',
            });
        }

        studentActivityModel.findOne({_id: id}, function (err, studentActivity) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentActivity',
                    error: err
                });
            }

            if (!studentActivity) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentActivity'
                });
            }

            studentActivity.Activitiestatus = req.body.Activitiestatus ? req.body.Activitiestatus : studentActivity.Activitiestatus;
			studentActivity.activity = req.body.activity ? req.body.activity : studentActivity.activity;
			studentActivity.position = req.body.position ? req.body.position : studentActivity.position;
			studentActivity.description = req.body.description ? req.body.description : studentActivity.description;
			studentActivity.started = req.body.started ? req.body.started : studentActivity.started;
			studentActivity.ended = req.body.ended ? req.body.ended : studentActivity.ended;
			studentActivity.apply = req.body.apply ? req.body.apply : studentActivity.apply;
			
            studentActivity.save(function (err, studentActivity) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating studentActivity.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Activity"});
            });
        });
    },

    /**
     * studentActivityController.remove()
     */
    remove: function (req, res) {

        
        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentActivities == null){
            return res.status(502).json({
                success:false,
                message: 'No Activities find in user data',
            });
        }

        if(!studentData.studentActivities.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Activities find in user data',
            });
        }

        studentActivityModel.findByIdAndRemove(id, function (err, studentActivity) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the studentActivity.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,
                message:"Deleted Succesfully"
            });
        });
    }
};
 