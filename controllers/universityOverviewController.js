var universityOverviewModel = require('../models/universityOverviewModel.js');
var universityModel = require('../models/universityModel')

/**
 * universityOverviewController.js
 *
 * @description :: Server-side logic for managing universityOverviews.
 */
module.exports = {

    /**
     * universityOverviewController.list()
     */
    list: function (req, res) {
        universityOverviewModel.find(function (err, universityOverviews) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting universityOverview.',
                    error: err
                });
            }

            return res.json(universityOverviews);
        });
    },

    /**
     * universityOverviewController.show()
     */
    show: function (req, res) {
        var universityData = res.locals.university; 
        res.locals.university = null;
        universityOverviewModel.findOne({_id: universityData.universityOverview}, function (err, universityOverview) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting universityOverview.',
                    error: err
                });
            }

            if (!universityOverview) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityOverview'
                });
            }

            return res.status(200).json(
            {
                success:true,
                universityOverview:universityOverview
            });
        });
    },

    /**
     * universityOverviewController.create()
     */
    create: function (req, res) {
        var universityOverview = new universityOverviewModel({
			year : req.body.year,
			ranking : req.body.ranking,
			rate : req.body.rate,
			course : req.body.course,
			courseNo : req.body.courseNo,
			intakes : req.body.intakes,
			courses : req.body.courses,
			english : req.body.english,
			cgpa : req.body.cgpa,
			rate : req.body.rate
        });

        universityOverview.save(function (err, universityOverview) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating universityOverview',
                    error: err
                });
            }

            return res.status(201).json(universityOverview);
        });
    },

    /**
     * universityOverviewController.update()
     */
    update: function (req, res) {
        var universityData = res.locals.university;
        res.locals.university = null;
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
            universityOverviewModel.findOne({_id: university.universityOverview}, async function (err, universityOverview) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting universityOverview',
                        error: err
                    });
                }

                if (!universityOverview) {
                    universityOverview = new universityOverviewModel({});   
                }

                universityOverview.year = req.body.year ? req.body.year : universityOverview.year;
                universityOverview.ranking = req.body.ranking ? req.body.ranking : universityOverview.ranking;
                universityOverview.rate = req.body.rate ? req.body.rate : universityOverview.rate;
                universityOverview.course = req.body.course ? req.body.course : universityOverview.course;
                universityOverview.courseNo = req.body.courseNo ? req.body.courseNo : universityOverview.courseNo;
                universityOverview.intakes = req.body.intakes ? req.body.intakes : universityOverview.intakes;
                universityOverview.courses = req.body.courses ? req.body.courses : universityOverview.courses;
                universityOverview.english = req.body.english ? req.body.english : universityOverview.english;
                universityOverview.cgpa = req.body.cgpa ? req.body.cgpa : universityOverview.cgpa;
                    universityOverview.month = req.body.month ? req.body.month : universityOverview.month;
                universityOverview.acceptanceRate = req.body.acceptanceRate ? req.body.acceptanceRate : universityOverview.acceptanceRate;
                universityOverview.foundedYear = req.body.foundedYear ? req.body.foundedYear : universityOverview.foundedYear;
                try{
                    await universityOverview.save();
                    university.universityOverview = universityOverview._id;
                    console.log(universityOverview)
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
     * universityOverviewController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        universityOverviewModel.findByIdAndRemove(id, function (err, universityOverview) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the universityOverview.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
