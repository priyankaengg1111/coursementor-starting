var adminScholarshipModel = require('../models/adminScholarshipModel.js');
var adminModel = require('../models/adminModel');
/**
 * adminScholarshipController.js
 *
 * @description :: Server-side logic for managing adminScholarships.
 */
module.exports = {

    /**
     * adminScholarshipController.list()
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
        
        adminScholarshipModel.find({_id:{$in:adminData.adminScholarships}},function (err, adminScholarships) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting adminScholarship.',
                    error: err
                });
            }

            return res.status(200).json({
                success:true,adminScholarships});
        });
    },

    /**
     * adminScholarshipController.show()
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
        if(!adminData.adminScholarships){
            console.log("i am done")
            return res.status(502).json({
                success:false,
                message: 'No scholarships find in user data',
            });
        }

        console.log("hello world")
        if(!adminData.adminScholarships.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No scholarships find in user data',
            });
        }

        adminScholarshipModel.findOne({_id: id}, function (err, adminScholarship) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting adminScholarship.',
                    error: err
                });
            }

            if (!adminScholarship) {
                return res.status(404).json({
                    success:false,
                    message: 'No such adminScholarship'
                });
            }

            return res.status(200).json({
                success:true,
                adminScholarship:adminScholarship
            });
        });
    },

    /**
     * adminScholarshipController.create()
     */
    create: function (req, res) {
        
        var adminData = res.locals.admin;
        console.log(adminData)
        var adminScholarshipData = new adminScholarshipModel({
			scholarship : req.body.scholarship,
        });
        console.log("hello world")
        adminScholarshipData.save(function (err, adminScholarship) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when creating adminScholarship',
                    error: err
                });
            }
            adminModel.findOne({_id:adminData._id},async (err,admin)=>{
                if(err){
                    return res.status(502).json({
                        success:false,
                        message: 'Error when creating scholarship in admin',
                        error: err
                    });
                }
                if(!admin){
                    return res.status(502).json({
                        success:false,
                        message: 'Error finding admin',
                    });
                }
                if(!admin.adminScholarships){
                    admin.adminScholarships = [];
                }
                admin.adminScholarships.push(adminScholarship._id)
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
     * adminScholarshipController.update()
     */
    update: function (req, res) {

        var adminData = res.locals.admin;
        var id = req.params.id;
        if(adminData.adminScholarships == null){
            return res.status(502).json({
                success:false,
                message: 'No scholarships find in user data',
            });
        }

        if(!adminData.adminScholarships.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No scholarships find in user data',
            });
        }

        adminScholarshipModel.findOne({_id: id}, function (err, adminScholarship) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when getting adminScholarship',
                    error: err
                });
            }

            if (!adminScholarship) {
                return res.status(404).json({
                    success:false,
                    message: 'No such adminScholarship'
                });
            }

            adminScholarship.scholarship = req.body.scholarship ? req.body.scholarship : adminScholarship.scholarship;
			
            adminScholarship.save(function (err, adminScholarship) {
                if (err) {
                    return res.status(502).json({
                        success:false,
                        message: 'Error when updating adminScholarship.',
                        error: err
                    });
                }

                return res.json({
                    success:true,
                    message:"Updated the scholarship"});
            });
        });
    },

    /**
     * adminScholarshipController.remove()
     */
    remove: function (req, res) {

        
        var adminData = res.locals.admin;
        var id = req.params.id;
        if(adminData.adminScholarships == null){
            return res.status(502).json({
                success:false,
                message: 'No scholarships find in user data',
            });
        }

        if(!adminData.adminScholarships.find((element)=>element == id)){
            return res.status(502).json({
                success:false,
                message: 'No scholarships find in user data',
            });
        }

        adminScholarshipModel.findByIdAndRemove(id, function (err, adminScholarship) {
            if (err) {
                return res.status(502).json({
                    success:false,
                    message: 'Error when deleting the adminScholarship.',
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
