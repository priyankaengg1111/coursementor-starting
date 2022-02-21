'use strict';
var adminModel = require('../models/adminModel.js');
const jwt = require("jsonwebtoken");
var generator = require('generate-password');
const Joi = require('joi');
const nodemailer = require('nodemailer')

const {
    ACCESS_TOKEN: ACCESS_TOKEN
  } = require('../core/config');

let transport = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

/**
 * adminController.js
 * @description :: Server-side logic for managing admins.
 */
module.exports = {

    /**
     * adminController.list()
     */
    list: function (req, res) {
        adminModel.find(function (err, admins) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting admin.',
                    error: err
                });
            }

            return res.json(admins);
        });
    },

    /**
     * adminController.create()
     */
    create: function (req, res) {
        var admin = new adminModel({
			name : req.body.name,
			aboutMe : req.body.aboutMe,
			gender : req.body.gender,
			address : req.body.address
        });
        admin.save(function (err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating admin',
                    error: err
                });
            }
            return res.status(201).json(admin);
        });
    },
    /**
     * adminController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        adminModel.findByIdAndRemove(id, function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the admin.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    register: async function(req,res){
        const body = req.body;
        // admin body
        const isValid = Joi.object({
            name: Joi.string(),
            email: Joi.string().email().required(),
            phone: Joi.string().trim().regex(/^\+[1-9]{1}[0-9]{3,14}$/).required()
        }).validate(body, { abortEarly: false, allowUnknown: false });
        // check if response structure is valid
        if (isValid.error) {
            return res.status(201)
                      .json({ success : false,message: "Input is invalid", error: isValid.error.details });
        }

        // check if already present
        var admin = await adminModel.findOne({ email: body.email });
        
        // if there is any admin or not
        if(admin){
            return res.status(201).json({
                success: false,
                message:"admin already exist"
            })
        }

        // generate random password
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        
        // create model
        admin = new adminModel({
            name:body.name,
            email:body.email,
            phone:body.phone,
            password:password,
        });


        // check if it is able to save admin
        try{
            const message = {
                from:'noreply@coursementor.com',
                to: body.email,         // List of recipients
                subject: 'UniMentor Email', // Subject line
                text: `Hello ${body.name}, Your password is ${password}` // Plain text body
            };
                
            var temp = null
            await transport.sendMail(message, async function(err, info) {
            console.log(err);  
                if (err) {
                    return res.status(400).send({success:false,message:"error in sending password"});    
                }
                else {
                    try{
                        await admin.save();
                        
                        return res.status(200).send({ 
                            success : true,message: "admin Created!"
                        });
                    }            
                    catch(e){
                        console.log(e)
                        return res.status(400).send({success : false, message: "Unable to save admin" });
                    }
                }
            });
        } 
        catch(e){
            console.log(e)
            return res.status(400).send({success : false, message: "Unable to use nodemailer" });
        }

    },
    forgotPassword :async function(req,res){
        if(!req.body.email){
            return res.status(401).json({
                success:false,
                messages:"Please provide email"
            })
        }
        
        adminModel.findOne({email:req.body.email},async (err,admin)=>{
            if(err){
                return res.status(401).json({
                    success:false,
                    messages:"DB Error"
                })
            }
            console.log(admin)
            if(!admin){
                return res.status(401).json({
                    success:false,
                    messages:"please register first"
                })
            }
            
            var password = generator.generate({
                length: 10,
                numbers: true
            });

            admin.password = password;

            try{
                const message = {
                    from:'noreply@coursementor.com',
                    to: req.body.email,         // List of recipients
                    subject: 'UniMentor Password Change Request', // Subject line
                    text: `Hello ${admin.name}, Your New password is ${password}` // Plain text body
                };
                transport.sendMail(message, async function(err, info) {
                    console.log(err);  
                    if (err) {
                        return res.status(400).send({success:false,message:"error in sending password"});    
                    }
                    else {
                        try{
                            await admin.save();                
                            return res.status(200).send({ 
                                success : true,message: "admin Password Changed"
                            });
                        }            
                        catch(e){
                            console.log(e)
                            return res.status(400).send({success : false, message: "Unable to save admin" });
                        }
                    }
                });
            } 
            catch(e){
                console.log(e)
                return res.status(400).send({success : false, message: "Unable to use nodemailer" });
            }
    
        })
    },
    login : async function(req,res){
        var body = req.body;
        console.log(body)
        const isValid = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        });

        if (isValid.validate(body).error) {
            return res.status(201).json({ 
                success : false,message: "Input is invalid" });
        }
        try{
            const admin = await adminModel.findOne({ email: body.email});

            if (!admin) {
                return res.status(201).json({
                    success : false,
                    message: "User not found"
                });
            }

            if(admin.password != body.password){
                return res.status(201).json({
                    success : false,
                    message: "Password not matched"
                });
            }
            
            const accessToken = jwt.sign({
                email: String(admin.email),
                password : String(admin.password),
                iat: new Date().getTime()
                },
                ACCESS_TOKEN.secret,
                { expiresIn: ACCESS_TOKEN.validity }
            );

            try {
                await admin.save();
            } 
            catch(e) {
                console.log(e)
                return res.status(201).json({ 
                    success : false,
                    message: "Unable to login"
                 });
            }
            return res.status(200).json({ 
                    success : true,
                    token:'Bearer '+accessToken,
                    admin:admin });
        }
        catch(e){
            console.log(e)
            return res.status(201).json({
            success : false, message: "Some Database connection error" });
        }
    },
    changePassword:function(req,res){
        var adminData = res.locals.admin;
        if(!req.body.password){
            es.status(401).json({
                success : false, message: "Some Database connection error" });
        }
        adminModel.findOne({_id:adminData._id,password:adminData.password},async (err,admin)=>{
            if(err){
                res.status(201).json({
                    error:err,
                    success : false, message: "Some Database error" });
            }
            if(!admin){
                res.status(401).json({
                    success : false, message: "No admin" });
            }
            admin.password = req.body.password;
            try{
                await admin.save();
                res.status(200).json({
                    success : true, message: "Password changed" });
            }
            catch(e){
                res.status(201).json({
                    error : e,
                    success : false, message: "Some Database connection error" });
            }
        })
    }
};