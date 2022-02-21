var universityImageModel = require('../models/universityImageModel.js');
var universityModel = require('../models/universityModel')

/**
 * universityImageController.js
 *
 * @description :: Server-side logic for managing universityImages.
 */
module.exports = {

    /**
     * universityImageController.list()
     */
    list: function (req, res) {
        universityImageModel.find(function (err, universityImages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting universityImage.',
                    error: err
                });
            }

            return res.json(universityImages);
        });
    },

    /**
     * universityImageController.show()
     */
    show: function (req, res) {
        var universityData = res.locals.university; 
        universityImageModel.findOne({_id: universityData.universityImage}, function (err, universityImage) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting universityImage.',
                    error: err
                });
            }

            if (!universityImage) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityImage'
                });
            }

            return res.status(200).json(
            {
                success:true,
                universityImage:universityImage
            });
        });
    },

    /**
     * universityImageController.create()
     */
    create: function (req, res) {
        var universityImage = new universityImageModel({
			image : req.body.image
        });

        universityImage.save(function (err, universityImage) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating universityImage',
                    error: err
                });
            }

            return res.status(201).json(universityImage);
        });
    },

    /**
     * universityImageController.update()
     */
    update: function (req, res) {
        var universityData = res.locals.university;

        universityModel.findOne({_id: universityData._id}, function (err, university) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting university',
                    error: err
                });
            }
            if (!university) {
                return res.status(404).json({
                    success:false,
                    message: 'No such university'
                });
            }
            universityImageModel.findOne({_id: university.universityImage}, async function (err, universityImage) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting universityImage',
                        error: err
                    });
                }

                if (!universityImage) {
                    universityImage = new universityImageModel({});   
                }

                universityImage.image = req.body.image ? req.body.image : universityImage.image;
                universityImage.logo = req.body.logo ? req.body.logo : universityImage.logo;
                universityImage.coverPic = req.body.coverPic ? req.body.coverPic : universityImage.coverPic;
                
                if(req.body.logo == "delete"){
                    universityImage.logo = null
                }

                if(req.body.coverPic == "delete"){
                    universityImage.coverPic = null
                }

                try{
                    await universityImage.save();
                    university.universityImage = universityImage._id;
                    console.log(universityImage)
                    university.save(function (err, university) {
                            if (err) {
                                return res.status(500).json({
                                    success:false,
                                    message: 'Error when updating university.',
                                    error: err
                                });
                            }
                            return res.json({
                            success:true,
                            message:"university Primary Details Updated"
                        });
                    });
                }
                catch(e){
                    return res.status(500).json({
                        success:false,
                        message: 'Error saving university information',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * universityImageController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        universityImageModel.findByIdAndRemove(id, function (err, universityImage) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the universityImage.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
