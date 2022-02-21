var adminDocumentModel = require('../models/adminDocumentModel.js');
var adminModel = require('../models/adminModel');
/**
 * adminDocumentController.js
 *
 * @description :: Server-side logic for managing adminDocuments.
 */
module.exports = {

    /**
     * adminDocumentController.list()
     */
    list: async function (req, res) {
        
        var adminData = await adminModel.find({});

        if (!adminData) {
            return res.status(502).json({
                success:false,
                message: 'No admin find in admin data',
            });
        }

        adminData = adminData[0]
        
        adminDocumentModel.find({_id:{$in:adminData.adminDocuments}},function (err, adminDocuments) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting adminDocument.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,adminDocuments});
        });
    },

    /**
     * adminDocumentController.show()
     */
    show: async function (req, res) {
        var adminData = await adminModel.find({});

        if (!adminData) {
            return res.status(502).json({
                success:false,
                message: 'No admin find in admin data',
            });
        }

        adminData = adminData[0]
        var id = req.params.id;
        console.log(id,adminData)
        if(!adminData.adminDocuments){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No documents find in user data',
            });
        }

        console.log("hello world")
        if(!adminData.adminDocuments.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No documents find in user data',
            });
        }

        adminDocumentModel.findOne({_id: id}, function (err, adminDocument) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting adminDocument.',
                    error: err
                });
            }

            if (!adminDocument) {
                return res.status(404).json({
                    success:false,
                    message: 'No such adminDocument'
                });
            }

            return res.status(200).json({
                success:true,
                adminDocument:adminDocument
            });
        });
    },

    /**
     * adminDocumentController.create()
     */
    create: function (req, res) {
        
        var adminData = res.locals.admin;

        var adminDocumentData = new adminDocumentModel({
			document : req.body.document,
        });
        console.log("hello world")
        adminDocumentData.save(function (err, adminDocument) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating adminDocument',
                    error: err
                });
            }
            adminModel.findOne({_id:adminData._id},async (err,admin)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating document in admin',
                        error: err
                    });
                }
                if(!admin){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding admin',
                    });
                }
                if(!admin.adminDocuments){
                    admin.adminDocuments = [];
                }
                admin.adminDocuments.push(adminDocument._id)
                console.log(admin)
                try{
                    await admin.save();
                    return res.status(200).json({
                        success:true,
                        message: 'Saved Mongo Db Data',
                    });
                }
                catch(e){
                    console.log(e)
                    return res.status(200).json({
                        success:false,
                        message: 'Error in Saving admin',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * adminDocumentController.update()
     */
    update: function (req, res) {

        var adminData = res.locals.admin;
        var id = req.params.id;
        if(adminData.adminDocuments == null){
            return res.status(502).json({
                success:false,
                message: 'No documents find in user data',
            });
        }

        if(!adminData.adminDocuments.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No documents find in user data',
            });
        }

        adminDocumentModel.findOne({_id: id}, function (err, adminDocument) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting adminDocument',
                    error: err
                });
            }

            if (!adminDocument) {
                return res.status(404).json({
                    success:false,
                    message: 'No such adminDocument'
                });
            }

            adminDocument.document = req.body.document ? req.body.document : adminDocument.document;
			
            adminDocument.save(function (err, adminDocument) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating adminDocument.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the document"});
            });
        });
    },

    /**
     * adminDocumentController.remove()
     */
    remove: function (req, res) {

        
        var adminData = res.locals.admin;
        var id = req.params.id;
        if(adminData.adminDocuments == null){
            return res.status(502).json({
                success:false,
                message: 'No documents find in user data',
            });
        }

        if(!adminData.adminDocuments.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No documents find in user data',
            });
        }

        adminDocumentModel.findByIdAndRemove(id, function (err, adminDocument) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the adminDocument.',
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
