var agentEvaluateModel = require('../models/agentEvaluateModel.js');
const agentModel = require('../models/agentModel.js');

/**
 * agentEvaluateController.js
 *
 * @description :: Server-side logic for managing agentEvaluates.
 */
module.exports = {
    /**
     *agentEvaluateController.show()
    */
    show: function (req, res) {
        var agent = res.locals.agent;
        agentEvaluateModel.findOne({_id: agent.agentEvaluate}, function (err, agentEvaluate) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting agentEvaluate.',
                    error: err
                });
            }
            if (!agentEvaluate) {
                return res.status(404).json({
                    success:false,
                    message: "No such agentEvaluate"
                });
            }
            return res.status(200).json({
                success:true,
                agentEvaluate:agentEvaluate});
        });
    },

    /**
     * agentEvaluateController.update()
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

            agentEvaluateModel.findOne({_id: agent.agentEvaluate}, async function (err, agentEvaluate) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting agentEvaluate',
                        error: err
                    });
                }
                console.log(agentEvaluate)
                if (!agentEvaluate) {
                   agentEvaluate = new agentEvaluateModel();
                }
              
                agentEvaluate.country = req.body.country ? req.body.country : agentEvaluate.country;
                agentEvaluate.state = req.body.state ? req.body.state : agentEvaluate.state;
                agentEvaluate.university = req.body.university ? req.body.university : agentEvaluate.university;
                agentEvaluate.education = req.body.education ? req.body.education : agentEvaluate.education;
                agentEvaluate.percentafe = req.body.percentafe ? req.body.percentafe : agentEvaluate.percentafe;
                agentEvaluate.percentage = req.body.percentage ? req.body.percentage : agentEvaluate.percentage;
                agentEvaluate.passing = req.body.passing ? req.body.passing : agentEvaluate.passing;
                agentEvaluate.passingYear = req.body.passingYear ? req.body.passingYear : agentEvaluate.passingYear;
                agentEvaluate.english = req.body.english ? req.body.english : agentEvaluate.english;
                agentEvaluate.Overall = req.body.Overall ? req.body.Overall : agentEvaluate.Overall;
                agentEvaluate.reading = req.body.reading ? req.body.reading : agentEvaluate.reading;
                agentEvaluate.listening = req.body.listening ? req.body.listening : agentEvaluate.listening;
                agentEvaluate.speaking = req.body.speaking ? req.body.speaking : agentEvaluate.speaking;
                agentEvaluate.writing = req.body.writing ? req.body.writing : agentEvaluate.writing;
                         
                try{
                    await agentEvaluate.save();
                    agent.agentEvaluate = agentEvaluate._id;
                    console.log(agentEvaluate)
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
                            message:"agent Evaluate updated"
                        });
                    });
                }
                catch(e){
                    return res.status(500).json({
                        success:false,
                        message: 'Error when updating agentEvaluate.',
                        error: err
                    });
                }
            });
        })
    },
};
