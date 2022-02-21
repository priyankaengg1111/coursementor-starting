var universityDocumentModel = require('../models/universityDocumentModel.js');
var universityModel = require('../models/universityModel');
/**
 * universityDocumentController.js
 *
 * @description :: Server-side logic for managing universityDocuments.
 */
module.exports = {

    /**
     * universityDocumentController.list()
     */
    list: function (req, res) {
        
        var universityData = res.locals.university;
        console.log(universityData)
        universityDocumentModel.find({_id:{$in:universityData.universityDocuments}},function (err, universityDocuments) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityDocument.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,universityDocuments});
        });
    },

    /**
     * universityDocumentController.show()
     */
    show: function (req, res) {
        
        var universityData = res.locals.university;
        var id = req.params.id;
        console.log(id,universityData)
        if(!universityData.universityDocuments){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No Documents find in user data',
            });
        }

        console.log("hello world")
        if(!universityData.universityDocuments.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Documents find in user data',
            });
        }

        universityDocumentModel.findOne({_id: id}, function (err, universityDocument) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityDocument.',
                    error: err
                });
            }

            if (!universityDocument) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityDocument'
                });
            }

            return res.status(200).json({
                success:true,
                universityDocument:universityDocument
            });
        });
    },

    /**
     * universityDocumentController.create()
     */
    create: function (req, res) {
        
        var universityData = res.locals.university;

        var universityDocumentData = new universityDocumentModel({
			document : req.body.document,
			
        });
        console.log("hello world")
        universityDocumentData.save(function (err, universityDocument) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating universityDocument',
                    error: err
                });
            }
            universityModel.findOne({_id:universityData._id},async (err,university)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating Document in university',
                        error: err
                    });
                }
                if(!university){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding university',
                    });
                }
                if(!university.universityDocuments){
                    university.universityDocuments = [];
                }
                university.universityDocuments.push(universityDocument._id)
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
     * universityDocumentController.update()
     */
    update: function (req, res) {

        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityDocuments == null){
            return res.status(502).json({
                success:false,
                message: 'No Documents find in user data',
            });
        }

        if(!universityData.universityDocuments.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Documents find in user data',
            });
        }

        universityDocumentModel.findOne({_id: id}, function (err, universityDocument) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting universityDocument',
                    error: err
                });
            }

            if (!universityDocument) {
                return res.status(404).json({
                    success:false,
                    message: 'No such universityDocument'
                });
            }

            universityDocument.document = req.body.document ? req.body.document : universityDocument.document;
			
            universityDocument.save(function (err, universityDocument) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating universityDocument.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the Document"});
            });
        });
    },

    /**
     * universityDocumentController.remove()
     */
    remove: function (req, res) {

        
        var universityData = res.locals.university;
        var id = req.params.id;
        if(universityData.universityDocuments == null){
            return res.status(502).json({
                success:false,
                message: 'No Documents find in user data',
            });
        }

        if(!universityData.universityDocuments.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No Documents find in user data',
            });
        }

        universityDocumentModel.findByIdAndRemove(id, function (err, universityDocument) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the universityDocument.',
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
