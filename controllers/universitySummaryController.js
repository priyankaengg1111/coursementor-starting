var universitySummaryModel = require('../models/universitySummaryModel.js');
var universityModel = require('../models/universityModel')

/**
 * universitySummaryController.js
 *
 * @ugPTE :: Server-side logic for managing universitySummarys.
 */
module.exports = {
    /**
     * universitySummaryController.show()
     */
    show: function (req, res) {
       var universityData = res.locals.university; 
       res.locals.university = null;
        universitySummaryModel.findOne({_id: universityData.universitySummary}, function (err, universitySummary) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting universitySummary.',
                    error: err
                });
            }

            if (!universitySummary) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universitySummary'
                });
            }

            return res.status(200).json(
            {
                success:true,
                universitySummary:universitySummary
            });
        });
    },

    /**
     * universitySummaryController.update()
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
            universitySummaryModel.findOne({_id: university.universitySummary}, async function (err, universitySummary) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting universitySummary',
                        error: err
                    });
                }

                if (!universitySummary) {
                    universitySummary = new universitySummaryModel({});   
                }

                universitySummary.campus = req.body.campus ? req.body.campus : universitySummary.campus;
                
                universitySummary.ugYear = req.body.ugYear ? req.body.ugYear : universitySummary.ugYear;
                universitySummary.pgYear = req.body.pgYear ? req.body.pgYear : universitySummary.pgYear;
                universitySummary.deposit = req.body.deposit ? req.body.deposit : universitySummary.deposit;
                universitySummary.graduateScore = req.body.graduateScore ? req.body.graduateScore : universitySummary.graduateScore;
                universitySummary.postGraduateScore = req.body.postGraduateScore ? req.body.postGraduateScore : universitySummary.postGraduateScore;
                universitySummary.ugIelts = req.body.ugIelts ? req.body.ugIelts : universitySummary.ugIelts;
                universitySummary.pgIelts = req.body.pgIelts ? req.body.pgIelts : universitySummary.pgIelts;
                universitySummary.ugPTE = req.body.ugPTE ? req.body.ugPTE : universitySummary.ugPTE;
                universitySummary.pgPTE = req.body.pgPTE ? req.body.pgPTE : universitySummary.pgPTE;
                universitySummary.intake = req.body.intake ? req.body.intake : universitySummary.intake;
                
                try{
                    await universitySummary.save();
                    university.universitySummary = universitySummary._id;
                    console.log(universitySummary)
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
                            message:"university Summary Updated"
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
    }
};
