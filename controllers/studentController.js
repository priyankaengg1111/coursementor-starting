'use strict';
var StudentModel = require('../models/studentModel.js');
const jwt = require("jsonwebtoken");
var generator = require('generate-password');
const Joi = require('joi');
const nodemailer = require('nodemailer')

const {
    ACCESS_TOKEN: ACCESS_TOKEN
  } = require('../core/config');
const studentPersonalInformationModel = require('../models/studentPersonalInformationModel.js');
const studentModel = require('../models/studentModel.js');

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
 * studentController.js
 * @description :: Server-side logic for managing students.
 */
module.exports = {

    /**
     * studentController.list()
     */
    list: function (req, res) {
        StudentModel.find(function (err, students) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student.',
                    error: err
                });
            }

            return res.json(students);
        });
    },

    /**
     * studentController.create()
     */
    create: function (req, res) {
        var student = new StudentModel({
			name : req.body.name,
			aboutMe : req.body.aboutMe,
			gender : req.body.gender,
			address : req.body.address
        });
        student.save(function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating student',
                    error: err
                });
            }
            return res.status(201).json(student);
        });
    },
    /**
     * studentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        StudentModel.findByIdAndRemove(id, function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the student.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    register: async function(req,res){
        const body = req.body;
        // student body
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
        var student = await StudentModel.findOne({ email: body.email });
        
        // if there is any student or not
        if(student){
            return res.status(201).json({
                success: false,
                message:"Student already exist"
            })
        }

        // generate random password
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        
        // create model
        student = new StudentModel({
            name:body.name,
            email:body.email,
            phone:body.phone,
            password:password,
        });


        // check if it is able to save student
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
                        await student.save();
                        
                        return res.status(200).send({ 
                            success : true,message: "Student Created!"
                        });
                    }            
                    catch(e){
                        console.log(e)
                        return res.status(400).send({success : false, message: "Unable to save student" });
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
        
        studentModel.findOne({email:req.body.email},async (err,student)=>{
            if(err){
                return res.status(401).json({
                    success:false,
                    messages:"DB Error"
                })
            }
            if(!student){
                return res.status(401).json({
                    success:false,
                    messages:"please register first"
                })
            }
            
            var password = generator.generate({
                length: 10,
                numbers: true
            });

            student.password = password;

            try{
                const message = {
                    from:'noreply@coursementor.com',
                    to: req.body.email,         // List of recipients
                    subject: 'UniMentor Password Change Request', // Subject line
                    text: `Hello ${student.name}, Your New password is ${password}` // Plain text body
                };
                transport.sendMail(message, async function(err, info) {
                    console.log(err);  
                    if (err) {
                        return res.status(400).send({success:false,message:"error in sending password"});    
                    }
                    else {
                        try{
                            await student.save();                
                            return res.status(200).send({ 
                                success : true,message: "Student Password Changed"
                            });
                        }            
                        catch(e){
                            console.log(e)
                            return res.status(400).send({success : false, message: "Unable to save student" });
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
            const student = await StudentModel.findOne({ email: body.email});

            if (!student) {
                return res.status(201).json({
                    success : false,
                    message: "User not found"
                });
            }

            if(student.password != body.password){
                return res.status(201).json({
                    success : false,
                    message: "Password not matched"
                });
            }
            
            const accessToken = jwt.sign({
                email: String(student.email),
                password : String(student.password),
                iat: new Date().getTime()
                },
                ACCESS_TOKEN.secret,
                { expiresIn: ACCESS_TOKEN.validity }
            );

            try {
                await student.save();
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
                    student:student });
        }
        catch(e){
            console.log(e)
            return res.status(201).json({
            success : false, message: "Some Database connection error" });
        }
    },
    list:function(req,res){
        studentModel.find({},{_id:1},(err,students)=>{
            if(err){
                res.status(500).json({
                    message:"Some error occured",
                    success:false,
                });
            }

            res.status(200).json({
                students,
                success:true
            })
        })
    },
    changePassword:function(req,res){
        var studentData = res.locals.student;
        if(!req.body.password){
            es.status(401).json({
                success : false, message: "Some Database connection error" });
        }
        studentModel.findOne({_id:studentData._id,password:studentData.password},async (err,student)=>{
            if(err){
                res.status(201).json({
                    error:err,
                    success : false, message: "Some Database error" });
            }
            if(!student){
                res.status(401).json({
                    success : false, message: "No student" });
            }
            student.password = req.body.password;
            try{
                await student.save();
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
