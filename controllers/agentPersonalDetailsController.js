var agentPersonalDetailsModel = require('../models/agentPersonalDetailsModel.js');
const agentModel = require('../models/agentModel.js');

/**
 * agentPersonalDetailsController.js
 *
 * @description :: Server-side logic for managing agentPersonalDetailss.
 */
module.exports = {
    /**
     *agentPersonalDetailsController.show()
    */
    show: function (req, res) {
        var agent = res.locals.agent;
        agentPersonalDetailsModel.findOne({_id: agent.agentPersonalDetails}, function (err, agentPersonalDetails) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting agentPersonalDetails.',
                    error: err
                });
            }
            if (!agentPersonalDetails) {
                return res.status(404).json({
                    success:false,
                    message: "No such agentPersonalDetails"
                });
            }
            return res.status(200).json({
                success:true,
                agentPersonalDetails:agentPersonalDetails});
        });
    },

    /**
     * agentPersonalDetailsController.update()
     */
    update: function (req, res) {
        var agentData = res.locals.agent;
        agentModel.findOne({_id:agentData._id},(err,agent)=>{
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting agent',
                    error: err
                });
            }
            if (!agent) {
                return res.status(404).json({
                    success:false,
                    message: 'No such agent'
                });
            }

            agentPersonalDetailsModel.findOne({_id: agent.agentPersonalDetails}, async function (err, agentPersonalDetails) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting agentPersonalDetails',
                        error: err
                    });
                }
                console.log(agentPersonalDetails)
                if (!agentPersonalDetails) {
                   agentPersonalDetails = new agentPersonalDetailsModel();
                }
              
                agentPersonalDetails.name = req.body.name ? req.body.name : agentPersonalDetails.name;
                agentPersonalDetails.phone = req.body.phone ? req.body.phone : agentPersonalDetails.phone;
                agentPersonalDetails.companyName = req.body.companyName ? req.body.companyName : agentPersonalDetails.companyName;
                agentPersonalDetails.country = req.body.country ? req.body.country : agentPersonalDetails.country;
                agentPersonalDetails.state = req.body.state ? req.body.state : agentPersonalDetails.state;
                agentPersonalDetails.city = req.body.city ? req.body.city : agentPersonalDetails.city;
                agentPersonalDetails.pincode = req.body.pincode ? req.body.pincode : agentPersonalDetails.pincode;
                agentPersonalDetails.certificate = req.body.certificate ? req.body.certificate : agentPersonalDetails.certificate;
                agentPersonalDetails.address = req.body.address ? req.body.address : agentPersonalDetails.address;
                agentPersonalDetails.email = req.body.email ? req.body.email : agentPersonalDetails.email;
                agentPersonalDetails.staffNumber = req.body.staffNumber ? req.body.staffNumber : agentPersonalDetails.staffNumber;
                agentPersonalDetails.accountName = req.body.accountName ? req.body.accountName : agentPersonalDetails.accountName;
                agentPersonalDetails.accountNo = req.body.accountNo ? req.body.accountNo : agentPersonalDetails.accountNo;
                agentPersonalDetails.bankName = req.body.bankName ? req.body.bankName : agentPersonalDetails.bankName;
                agentPersonalDetails.bankIFSC = req.body.bankIFSC ? req.body.bankIFSC : agentPersonalDetails.bankIFSC;
                agentPersonalDetails.logo = req.body.logo ? req.body.logo : agentPersonalDetails.logo;
			        
                try{
                    await agentPersonalDetails.save();
                    agent.agentPersonalDetails = agentPersonalDetails._id;
                    console.log(agentPersonalDetails)
                    agent.save(function (err, agent) {
                            if (err) {
                                return res.status(500).json({
                                    success:false,
                                    message: 'Error when updating agent.',
                                    error: err
                                });
                            }
                            return res.status(200).json({
                            success:true,
                            message:"agent PersonalDetails updated"
                        });
                    });
                }
                catch(e){
                    return res.status(500).json({
                        success:false,
                        message: 'Error when updating agentPersonalDetails.',
                        error: err
                    });
                }
            });
        })
    },
};
