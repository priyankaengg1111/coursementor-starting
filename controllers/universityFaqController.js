var universityFaqModel = require('../models/universityFaqModel.js');
var universityModel = require('../models/universityModel');
/**
 * universityFaqController.js
 *
 * @description :: Server-side logic for managing universityFaqs.
 */
module.exports = {

    /**
     * universityFaqController.list()
     */
    list: function (req, res) {
        
        var universityData = res.locals.university;
        
        universityFaqModel.find({_id:{$in:universityData.universityFaqs}},function (err, universityFaqs) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityFaq.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,universityFaqs});
        });
    },

    /**
     * universityFaqController.show()
     */
    show: function (req, res) {
        
        var universityData = res.locals.university;
        var id = req.params.id;
        console.log(id,universityData)
        if(!universityData.universityFaqs){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Faqs find in user data',
            });
        }

        console.log("hello world")
        if(!universityData.universityFaqs.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Faqs find in user data',
            });
        }

        universityFaqModel.findOne({_id: id}, function (err, universityFaq) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityFaq.',
                    error: err
                });
            }

            if (!universityFaq) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityFaq'
                });
            }

            return res.status(200).json({
                success:true,
                universityFaq:universityFaq
            });
        });
    },

    /**
     * universityFaqController.create()
     */
    create: function (req, res) {
        
        var universityData = res.locals.university;

        var universityFaqData = new universityFaqModel({
			question:req.body.question,
            answer:req.body.answer
        });
        console.log("hello world")
        universityFaqData.save(function (err, universityFaq) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating universityFaq',
                    error: err
                });
            }
            universityModel.findOne({_id:universityData._id},async (err,university)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Faq in university',
                        error: err
                    });
                }
                if(!university){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding university',
                    });
                }
                if(!university.universityFaqs){
                    university.universityFaqs = [];
                }
                university.universityFaqs.push(universityFaq._id)
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
     * universityFaqController.update()
     */
    update: function (req, res) {

        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityFaqs == null){
            return res.status(502).json({
                success:false,
                message: 'No Faqs find in user data',
            });
        }

        if(!universityData.universityFaqs.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Faqs find in user data',
            });
        }

        universityFaqModel.findOne({_id: id}, function (err, universityFaq) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityFaq',
                    error: err
                });
            }

            if (!universityFaq) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityFaq'
                });
            }
            universityFaq.question = req.body.question ? req.body.question : universityFaq.question;
            universityFaq.answer = req.body.answer ? req.body.answer : universityFaq.answer;

            universityFaq.save(function (err, universityFaq) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating universityFaq.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Faq"});
            });
        });
    },

    /**
     * universityFaqController.remove()
     */
    remove: function (req, res) {

        
        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityFaqs == null){
            return res.status(502).json({
                success:false,
                message: 'No Faqs find in user data',
            });
        }

        if(!universityData.universityFaqs.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Faqs find in user data',
            });
        }

        universityFaqModel.findByIdAndRemove(id, function (err, universityFaq) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the universityFaq.',
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
