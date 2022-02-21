var studentBookmarkModel = require('../models/studentBookmarkModel.js');
var studentModel = require('../models/studentModel');
/**
 * studentBookmarkController.js
 *
 * @description :: Server-side logic for managing studentBookmarks.
 */
module.exports = {

    /**
     * studentBookmarkController.list()
     */
    list: function (req, res) {
        
        var studentData = res.locals.student;
        
        studentBookmarkModel.find({_id:{$in:studentData.studentBookmarks}},function (err, studentBookmarks) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentBookmark.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,studentBookmarks});
        });
    },

    /**
     * studentBookmarkController.show()
     */
    show: function (req, res) {
        
        var studentData = res.locals.student;
        var id = req.params.id;
        console.log(id,studentData)
        if(!studentData.studentBookmarks){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Bookmarks find in user data',
            });
        }

        console.log("hello world")
        if(!studentData.studentBookmarks.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Bookmarks find in user data',
            });
        }

        studentBookmarkModel.findOne({_id: id}, function (err, studentBookmark) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentBookmark.',
                    error: err
                });
            }

            if (!studentBookmark) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentBookmark'
                });
            }

            return res.status(200).json({
                success:true,
                studentBookmark:studentBookmark
            });
        });
    },

    /**
     * studentBookmarkController.create()
     */
    create: function (req, res) {
        
        var studentData = res.locals.student;

        var studentBookmarkData = new studentBookmarkModel({
			universityID : req.body.universityID,
            logo : req.body.logo,
            name : req.body.name
        });
        console.log("hello world")
        studentBookmarkData.save(function (err, studentBookmark) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating studentBookmark',
                    error: err
                });
            }
            studentModel.findOne({_id:studentData._id},async (err,student)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Bookmark in student',
                        error: err
                    });
                }
                if(!student){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding student',
                    });
                }
                if(!student.studentBookmarks){
                    student.studentBookmarks = [];
                }
                student.studentBookmarks.push(studentBookmark._id)
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
     * studentBookmarkController.update()
     */
    update: function (req, res) {

        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentBookmarks == null){
            return res.status(502).json({
                success:false,
                message: 'No Bookmarks find in user data',
            });
        }

        if(!studentData.studentBookmarks.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Bookmarks find in user data',
            });
        }

        studentBookmarkModel.findOne({_id: id}, function (err, studentBookmark) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting studentBookmark',
                    error: err
                });
            }

            if (!studentBookmark) {
                return res.status(404).json({
                    success:false,
                    message: 'No such studentBookmark'
                });
            }

            
            studentBookmark.save(function (err, studentBookmark) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating studentBookmark.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Bookmark"});
            });
        });
    },

    /**
     * studentBookmarkController.remove()
     */
    remove: function (req, res) {

        
        var studentData = res.locals.student;
        var id = req.params.id;
        if(studentData.studentBookmarks == null){
            return res.status(502).json({
                success:false,
                message: 'No Bookmarks find in user data',
            });
        }

        if(!studentData.studentBookmarks.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Bookmarks find in user data',
            });
        }

        studentBookmarkModel.findByIdAndRemove(id, function (err, studentBookmark) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the studentBookmark.',
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
