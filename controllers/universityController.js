'use strict';
var universityModel = require('../models/universityModel.js');
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
 * universityController.js
 *
 * @description :: Server-side logic for managing universitys.
 */
module.exports = {

    list: function (req, res) {
        universityModel.find(function (err, universitys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting university.',
                    error: err
                });
            }

            return res.json(universitys);
        });
    },
    register: async function(req,res){
        const body = req.body;
        // university body
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
        var university = await universityModel.findOne({ email: body.email });
        
        // if there is any university or not
        if(university){
            return res.status(201).json({
                success: false,
                message:"university already exist"
            })
        }

        // generate random password
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        
        // create model
        university = new universityModel({
            name:body.name,
            email:body.email,
            phone:body.phone,
            password:password,
        });


        // check if it is able to save university
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
                        await university.save();
                        
                        return res.status(200).send({ 
                            success : true,message: "university Created!"
                        });
                    }            
                    catch(e){
                        console.log(e)
                        return res.status(400).send({success : false, message: "Unable to save university" });
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
        
        universityModel.findOne({email:req.body.email},async (err,university)=>{
            if(err){
                return res.status(401).json({
                    success:false,
                    messages:"DB Error"
                })
            }
            console.log(university)
            if(!university){
                return res.status(401).json({
                    success:false,
                    messages:"please register first"
                })
            }
            
            var password = generator.generate({
                length: 10,
                numbers: true
            });

            university.password = password;

            try{
                const message = {
                    from:'noreply@coursementor.com',
                    to: req.body.email,         // List of recipients
                    subject: 'UniMentor Password Change Request', // Subject line
                    text: `Hello ${university.name}, Your New password is ${password}` // Plain text body
                };
                transport.sendMail(message, async function(err, info) {
                    console.log(err);  
                    if (err) {
                        return res.status(400).send({success:false,message:"error in sending password"});    
                    }
                    else {
                        try{
                            await university.save();                
                            return res.status(200).send({ 
                                success : true,message: "university Password Changed"
                            });
                        }            
                        catch(e){
                            console.log(e)
                            return res.status(400).send({success : false, message: "Unable to save university" });
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
            const university = await universityModel.findOne({ email: body.email});

            if (!university) {
                return res.status(201).json({
                    success : false,
                    message: "User not found"
                });
            }

            if(university.password != body.password){
                return res.status(201).json({
                    success : false,
                    message: "Password not matched"
                });
            }
            
            const accessToken = jwt.sign({
                    email: String(university.email),
                    password : String(university.password),
                    iat: new Date().getTime()
                },
                ACCESS_TOKEN.secret,
                { expiresIn: ACCESS_TOKEN.validity }
            );

            try {
                await university.save();
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
                    university:university });
        }
        catch(e){
            console.log(e)
            return res.status(201).json({
            success : false, message: "Some Database connection error" });
        }
    },
    changePassword:function(req,res){
        var universityData = res.locals.university;
        res.locals.university = null;
        if(!req.body.password){
            es.status(401).json({
                success : false, message: "Some Database connection error" });
        }
        universityModel.findOne({_id:universityData._id,password:universityData.password},async (err,university)=>{
            if(err){
                res.status(201).json({
                    error:err,
                    success : false, message: "Some Database error" });
            }
            if(!university){
                res.status(401).json({
                    success : false, message: "No university" });
            }
            university.password = req.body.password;
            try{
                await university.save();
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
