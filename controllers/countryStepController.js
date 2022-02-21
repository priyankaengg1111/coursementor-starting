var CountrystepModel = require('../models/countryStepModel.js');

/**
 * countryStepController.js
 *
 * @description :: Server-side logic for managing countrySteps.
 */
module.exports = {

    /**
     * countryStepController.list()
     */
    list: function (req, res) {
        CountrystepModel.find(function (err, countrySteps) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting countryStep.',
                    error: err
                });
            }

            return res.json(countrySteps);
        });
    },

    /**
     * countryStepController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CountrystepModel.findOne({_id: id}, function (err, countryStep) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting countryStep.',
                    error: err
                });
            }

            if (!countryStep) {
                return res.status(404).json({
                    message: 'No such countryStep'
                });
            }

            return res.json(countryStep);
        });
    },

    /**
     * countryStepController.create()
     */
    create: function (req, res) {
        var countryStep = new CountrystepModel({
			value : req.body.value
        });

        countryStep.save(function (err, countryStep) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating countryStep',
                    error: err
                });
            }

            return res.status(201).json(countryStep);
        });
    },

    /**
     * countryStepController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CountrystepModel.findOne({_id: id}, function (err, countryStep) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting countryStep',
                    error: err
                });
            }

            if (!countryStep) {
                return res.status(404).json({
                    message: 'No such countryStep'
                });
            }

            countryStep.value = req.body.value ? req.body.value : countryStep.value;
			
            countryStep.save(function (err, countryStep) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating countryStep.',
                        error: err
                    });
                }

                return res.json(countryStep);
            });
        });
    },

    /**
     * countryStepController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CountrystepModel.findByIdAndRemove(id, function (err, countryStep) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the countryStep.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
