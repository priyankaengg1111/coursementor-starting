var agentPartnerModel = require('../models/agentPartnerModel.js');
var agentModel = require('../models/agentModel');
/**
 * agentPartnerController.js
 *
 * @description :: Server-side logic for managing agentPartners.
 */
module.exports = {

    /**
     * agentPartnerController.list()
     */
    list: function (req, res) {
        
        var agentData = res.locals.agent;
        
        agentPartnerModel.find({_id:{$in:agentData.agentPartners}},function (err, agentPartners) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting agentPartner.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,agentPartners});
        });
    },

    /**
     * agentPartnerController.show()
     */
    show: function (req, res) {
        
        var agentData = res.locals.agent;
        var id = req.params.id;
        console.log(id,agentData)
        if(!agentData.agentPartners){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        console.log("hello world")
        if(!agentData.agentPartners.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        agentPartnerModel.findOne({_id: id}, function (err, agentPartner) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting agentPartner.',
                    error: err
                });
            }

            if (!agentPartner) {
                return res.status(404).json({
                    success:false,
                    message: 'No such agentPartner'
                });
            }

            return res.status(200).json({
                success:true,
                agentPartner:agentPartner
            });
        });
    },

    /**
     * agentPartnerController.create()
     */
    create: function (req, res) {
        
        var agentData = res.locals.agent;

        var agentPartnerData = new agentPartnerModel({
			name : req.body.name,
			email : req.body.email,
			phone : req.body.phone,
			address : req.body.address,
			city : req.body.city,
			state : req.body.state,
			country : req.body.country,
			country : req.body.country,
			logo : req.body.logo,
			description : req.body.description,
			exam : req.body.exam,
            tuitionphone:req.body.tuitionphone
        });
        console.log("hello world")
        agentPartnerData.save(function (err, agentPartner) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating agentPartner',
                    error: err
                });
            }
            agentModel.findOne({_id:agentData._id},async (err,agent)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating course in agent',
                        error: err
                    });
                }
                if(!agent){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding agent',
                    });
                }
                if(!agent.agentPartners){
                    agent.agentPartners = [];
                }
                agent.agentPartners.push(agentPartner._id)
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
     * agentPartnerController.update()
     */
    update: function (req, res) {

        var agentData = res.locals.agent;
        var id = req.params.id;
        if(agentData.agentPartners == null){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        if(!agentData.agentPartners.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        agentPartnerModel.findOne({_id: id}, function (err, agentPartner) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting agentPartner',
                    error: err
                });
            }

            if (!agentPartner) {
                return res.status(404).json({
                    success:false,
                    message: 'No such agentPartner'
                });
            }

            agentPartner.name = req.body.name ? req.body.name : agentPartner.name;
			agentPartner.email = req.body.email ? req.body.email : agentPartner.email;
			agentPartner.phone = req.body.phone ? req.body.phone : agentPartner.phone;
			agentPartner.address = req.body.address ? req.body.address : agentPartner.address;
			agentPartner.city = req.body.city ? req.body.city : agentPartner.city;
			agentPartner.state = req.body.state ? req.body.state : agentPartner.state;
			agentPartner.country = req.body.country ? req.body.country : agentPartner.country;
			agentPartner.logo = req.body.logo ? req.body.logo : agentPartner.logo;
			
            agentPartner.save(function (err, agentPartner) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating agentPartner.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the course"});
            });
        });
    },

    /**
     * agentPartnerController.remove()
     */
    remove: function (req, res) {

        
        var agentData = res.locals.agent;
        var id = req.params.id;
        if(agentData.agentPartners == null){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        if(!agentData.agentPartners.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No courses find in user data',
            });
        }

        agentPartnerModel.findByIdAndRemove(id, function (err, agentPartner) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the agentPartner.',
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
