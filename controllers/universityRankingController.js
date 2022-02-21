var universityRankingModel = require('../models/universityRankingModel.js');
var universityModel = require('../models/universityModel');
/**
 * universityRankingController.js
 *
 * @description :: Server-side logic for managing universityRankings.
 */
module.exports = {

    /**
     * universityRankingController.list()
     */
    list: function (req, res) {
        
        var universityData = res.locals.university;
        
        universityRankingModel.find({_id:{$in:universityData.universityRankings}},function (err, universityRankings) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityRanking.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,universityRankings});
        });
    },

    /**
     * universityRankingController.show()
     */
    show: function (req, res) {
        
        var universityData = res.locals.university;
        var id = req.params.id;
        console.log(id,universityData)
        if(!universityData.universityRankings){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Rankings find in user data',
            });
        }

        console.log("hello world")
        if(!universityData.universityRankings.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Rankings find in user data',
            });
        }

        universityRankingModel.findOne({_id: id}, function (err, universityRanking) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityRanking.',
                    error: err
                });
            }

            if (!universityRanking) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityRanking'
                });
            }

            return res.status(200).json({
                success:true,
                universityRanking:universityRanking
            });
        });
    },

    /**
     * universityRankingController.create()
     */
    create: function (req, res) {
        
        var universityData = res.locals.university;

        var universityRankingData = new universityRankingModel({
			agencyName : req.body.agencyName,
			rank : req.body.rank,
			year : req.body.year,
			certificate : req.body.certificate
        });
        console.log("hello world")
        universityRankingData.save(function (err, universityRanking) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating universityRanking',
                    error: err
                });
            }
            universityModel.findOne({_id:universityData._id},async (err,university)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Ranking in university',
                        error: err
                    });
                }
                if(!university){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding university',
                    });
                }
                if(!university.universityRankings){
                    university.universityRankings = [];
                }
                university.universityRankings.push(universityRanking._id)
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
     * universityRankingController.update()
     */
    update: function (req, res) {
        console.log("dmsjknsjkdnjk")
        console.log(req.params.id)
        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityRankings == null){
            return res.status(502).json({
                success:false,
                message: 'No Rankings find in user data',
            });
        }

        if(!universityData.universityRankings.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Rankings find in user data',
            });
        }

        universityRankingModel.findOne({_id: id}, function (err, universityRanking) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityRanking',
                    error: err
                });
            }

            if (!universityRanking) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityRanking'
                });
            }

            universityRanking.agencyName = req.body.agencyName ? req.body.agencyName : universityRanking.agencyName;
			universityRanking.rank = req.body.rank ? req.body.rank : universityRanking.rank;
			universityRanking.year = req.body.year ? req.body.year : universityRanking.year;
			universityRanking.certificate = req.body.certificate ? req.body.certificate : universityRanking.certificate;
			
            universityRanking.save(function (err, universityRanking) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating universityRanking.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Ranking"});
            });
        });
    },

    /**
     * universityRankingController.remove()
     */
    remove: function (req, res) {

        
        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityRankings == null){
            return res.status(502).json({
                success:false,
                message: 'No Rankings find in user data',
            });
        }

        if(!universityData.universityRankings.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Rankings find in user data',
            });
        }

        universityRankingModel.findByIdAndRemove(id, function (err, universityRanking) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the universityRanking.',
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
