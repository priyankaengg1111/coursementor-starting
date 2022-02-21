var universityImageVideoModel = require('../models/universityImageVideoModel.js');
var universityModel = require('../models/universityModel');
/**
 * universityImageVideoController.js
 *
 * @description :: Server-side logic for managing universityImageVideos.
 */
module.exports = {

    /**
     * universityImageVideoController.list()
     */
    list: function (req, res) {
        
        var universityData = res.locals.university;
        
        universityImageVideoModel.find({_id:{$in:universityData.universityImageVideos}},function (err, universityImageVideos) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityImageVideo.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,universityImageVideos});
        });
    },

    /**
     * universityImageVideoController.show()
     */
    show: function (req, res) {
        
        var universityData = res.locals.university;
        var id = req.params.id;
        console.log(id,universityData)
        if(!universityData.universityImageVideos){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No ImageVideos find in user data',
            });
        }

        console.log("hello world")
        if(!universityData.universityImageVideos.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No ImageVideos find in user data',
            });
        }

        universityImageVideoModel.findOne({_id: id}, function (err, universityImageVideo) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityImageVideo.',
                    error: err
                });
            }

            if (!universityImageVideo) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityImageVideo'
                });
            }

            return res.status(200).json({
                success:true,
                universityImageVideo:universityImageVideo
            });
        });
    },

    /**
     * universityImageVideoController.create()
     */
    create: function (req, res) {
        
        var universityData = res.locals.university;

        var universityImageVideoData = new universityImageVideoModel({
            link : req.body.link,
            type : req.body.type
        });
        console.log("hello world")
        universityImageVideoData.save(function (err, universityImageVideo) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating universityImageVideo',
                    error: err
                });
            }
            universityModel.findOne({_id:universityData._id},async (err,university)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating ImageVideo in university',
                        error: err
                    });
                }
                if(!university){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding university',
                    });
                }
                if(!university.universityImageVideos){
                    university.universityImageVideos = [];
                }
                university.universityImageVideos.push(universityImageVideo._id)
                console.log(university)
                try{
                    await university.save();
                    return res.status(200).json({
                        success:true,
                        message: 'Saved Mongo Db Data',
                    });
                }
                catch(e){
                    console.log(e)
                    return res.status(200).json({
                        success:false,
                        message: 'Error in Saving University',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * universityImageVideoController.update()
     */
    update: function (req, res) {

        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityImageVideos == null){
            return res.status(502).json({
                success:false,
                message: 'No ImageVideos find in user data',
            });
        }

        if(!universityData.universityImageVideos.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No ImageVideos find in user data',
            });
        }

        universityImageVideoModel.findOne({_id: id}, function (err, universityImageVideo) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityImageVideo',
                    error: err
                });
            }

            if (!universityImageVideo) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityImageVideo'
                });
            }

            universityImageVideo.link = req.body.link ? req.body.link : universityImageVideo.link;
            universityImageVideo.type = req.body.type ? req.body.type : universityImageVideo.type;
            

            universityImageVideo.save(function (err, universityImageVideo) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating universityImageVideo.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the ImageVideo"});
            });
        });
    },

    /**
     * universityImageVideoController.remove()
     */ 
    remove: function (req, res) {

        
        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityImageVideos == null){
            return res.status(502).json({
                success:false,
                message: 'No ImageVideos find in user data',
            });
        }

        if(!universityData.universityImageVideos.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No ImageVideos find in user data',
            });
        }

        universityImageVideoModel.findByIdAndRemove(id, function (err, universityImageVideo) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the universityImageVideo.',
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
