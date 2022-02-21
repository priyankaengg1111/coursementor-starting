var agentCommissionModel = require('../models/agentCommissionModel.js');
var agentModel = require('../models/agentModel');
/**
 * agentCommissionController.js
 *
 * @description :: Server-side logic for managing agentCommissions.
 */
module.exports = {

    /**
     * agentCommissionController.list()
     */
    list: function (req, res) {
        
        var agentData = res.locals.agent;
        
        agentCommissionModel.find({_id:{$in:agentData.agentCommissions}},function (err, agentCommissions) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting agentCommission.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,agentCommissions});
        });
    },

    /**
     * agentCommissionController.show()
     */
    show: function (req, res) {
        
        var agentData = res.locals.agent;
        var id = req.params.id;
        console.log(id,agentData)
        if(!agentData.agentCommissions){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        console.log("hello world")
        if(!agentData.agentCommissions.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        agentCommissionModel.findOne({_id: id}, function (err, agentCommission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting agentCommission.',
                    error: err
                });
            }

            if (!agentCommission) {
                return res.status(404).json({
                    success:false,
                    message: 'No such agentCommission'
                });
            }

            return res.status(200).json({
                success:true,
                agentCommission:agentCommission
            });
        });
    },

    /**
     * agentCommissionController.create()
     */
    create: function (req, res) {
        
        var agentData = res.locals.agent;

        var agentCommissionData = new agentCommissionModel({
			commissionName : req.body.commissionName,
			duration : req.body.duration,
			fee : req.body.fee,
			studyField : req.body.studyField,
			commissionLevel : req.body.commissionLevel,
			cgpa : req.body.cgpa,
			eligibility : req.body.eligibility,
			english : req.body.english,
			website : req.body.website,
			description : req.body.description,
			exam : req.body.exam,
            tuitionFee:req.body.tuitionFee
        });
        console.log("hello world")
        agentCommissionData.save(function (err, agentCommission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating agentCommission',
                    error: err
                });
            }
            agentModel.findOne({_id:agentData._id},async (err,agent)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Commission in agent',
                        error: err
                    });
                }
                if(!agent){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding agent',
                    });
                }
                if(!agent.agentCommissions){
                    agent.agentCommissions = [];
                }
                agent.agentCommissions.push(agentCommission._id)
                console.log(agent)
                try{
                    await agent.save();
                    return res.status(200).json({
                        success:true,
                        message: 'Saved Mongo Db Data',
                    });
                }
                catch(e){
                    console.log(e)
                    return res.status(200).json({
                        success:false,
                        message: 'Error in Saving agent',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * agentCommissionController.update()
     */
    update: function (req, res) {

        var agentData = res.locals.agent;
        var id = req.params.id;
        if(agentData.agentCommissions == null){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        if(!agentData.agentCommissions.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        agentCommissionModel.findOne({_id: id}, function (err, agentCommission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting agentCommission',
                    error: err
                });
            }

            if (!agentCommission) {
                return res.status(404).json({
                    success:false,
                    message: 'No such agentCommission'
                });
            }

            agentCommission.commissionName = req.body.commissionName ? req.body.commissionName : agentCommission.commissionName;
			agentCommission.duration = req.body.duration ? req.body.duration : agentCommission.duration;
			agentCommission.fee = req.body.fee ? req.body.fee : agentCommission.fee;
			agentCommission.studyField = req.body.studyField ? req.body.studyField : agentCommission.studyField;
			agentCommission.commissionLevel = req.body.commissionLevel ? req.body.commissionLevel : agentCommission.commissionLevel;
			agentCommission.cgpa = req.body.cgpa ? req.body.cgpa : agentCommission.cgpa;
			agentCommission.eligibility = req.body.eligibility ? req.body.eligibility : agentCommission.eligibility;
			agentCommission.english = req.body.english ? req.body.english : agentCommission.english;
			agentCommission.website = req.body.website ? req.body.website : agentCommission.website;
			agentCommission.description = req.body.description ? req.body.description : agentCommission.description;
			agentCommission.exam = req.body.exam ? req.body.exam : agentCommission.exam;
			agentCommission.tuitionFee = req.body.tuitionFee ? req.body.tuitionFee : agentCommission.tuitionFee;
			
            agentCommission.save(function (err, agentCommission) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating agentCommission.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Commission"});
            });
        });
    },

    /**
     * agentCommissionController.remove()
     */
    remove: function (req, res) {

        
        var agentData = res.locals.agent;
        var id = req.params.id;
        if(agentData.agentCommissions == null){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        if(!agentData.agentCommissions.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Commissions find in user data',
            });
        }

        agentCommissionModel.findByIdAndRemove(id, function (err, agentCommission) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the agentCommission.',
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
