'use strict';
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const universityModel = require('../models/universityModel')
const {
  ACCESS_TOKEN: ACCESS_TOKEN
} = require('../core/config');
const mongoose = require("mongoose");
const studentModel = require("../models/studentModel");
const agentModel = require("../models/agentModel");
const adminModel = require('../models/adminModel')

module.exports={
  verifyAgentStudentConversion : async function(req,res,next){
    var id = req.params.id;
    var agentData = res.locals.agent;
    if(agentData.students == null || !agentData.students.find((item=>item==id))){
      return res.status(400).json({
        success:false,
        message:"Student not found in agent"
      })
    }
    var student = await studentModel.findOne({_id:id});
      if(!student){ 
        return res.status(400).json({
          success:false,
          message:"No student has been found"
        });
      }
    res.locals.student = student;
    console.log(res.locals)
    next();
  },
  verifyAdminStudentConversion: async function(req,res, next){
    var id = req.params.id;
    var student = await studentModel.findOne({_id:id});
      if(!student){ 
        return res.status(400).json({
          success:false,
          message:"No student has been found"
        });
      }
    res.locals.student = student;
    console.log(res.locals)
    next();
  },
  verifyUniversityToken : async function (req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (token) {
      console.log("i am in university verificayion")
      jwt.verify(token, ACCESS_TOKEN.secret, async (err, decodedToken) => {
        if (err) {
          return res.status(422).json({ success:false, message: "Invalid Token" });
        } else {
          const university = await universityModel.findOne({
            email : decodedToken?.email,
            password : decodedToken?.password
          }).lean();
          if(!university){
            return res.status(422).json({success:false, message: "No data found for university" });    
          }
          res.locals.university = university;
          next();
        }
      });
    } 
    else {
      res.status(422).json({ message: "Access Denied, User not logged in" });
    }
  },
  
  verifyStudentToken : async function (req, res, next){
    console.log(res)
    if(res && res.locals && res.locals.student){
      next();
      return ;
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    console.log(token)
    console.log("hello world")
    if (token) {
      jwt.verify(token, ACCESS_TOKEN.secret, async (err, decodedToken) => {
        if (err) {
          res.status(422).json({ message: "Invalid Token" });
        } else {
          const student = await studentModel.findOne({
            email : decodedToken?.email,
            password : decodedToken?.password
          }).lean();

          res.locals.student = student;
          
          next();
        }
      });
    } 
    else {
      res.status(422).json({ message: "Access Denied, User not logged in" });
    }
  },
  verifyAdminToken : async function (req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (token) {
      console.log("i am in admin verificayion")
      jwt.verify(token, ACCESS_TOKEN.secret, async (err, decodedToken) => {
        if (err) {
          return res.status(422).json({ success:false, message: "Invalid Token" });
        } else {
          const admin = await adminModel.findOne({
            email : decodedToken?.email,
            password : decodedToken?.password}
          ).lean();
          if(!admin){
            return res.status(422).json({success:false, message: "No data found for admin" });    
          }
          res.locals.admin = admin;
          next();
        }
      });
    } 
    else {
      res.status(422).json({ message: "Access Denied, User not logged in" });
    }
  },
  verifyAgentToken : async function (req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    console.log("hello world")
    if (token) {
      jwt.verify(token, ACCESS_TOKEN.secret, async (err, decodedToken) => {
        if (err) {
          res.status(422).json({ message: "Invalid Token" });
        } else {
          const agent = await agentModel.findOne(
            {
              email : decodedToken?.email,
              password : decodedToken?.password
            }
          ).lean();
          res.locals.agent = agent;
          next();
        }
      });
    } 
    else {
      res.status(422).json({ message: "Access Denied, User not logged in" });
    }
  },
  verifyadminIDToAdminConversion:async function(req,res,next){
    const admin = await adminModel.findById(
            mongoose.Types.ObjectId(req.params.adminID)
          ).lean();
    res.locals.admin = admin;
    next();
  },
  verifyuniversityIDToUniersityConversion:async function(req,res,next){
    const university = await universityModel.findById(
            mongoose.Types.ObjectId(req.params.universityID)
          ).lean();
    res.locals.university = university;
    next();
  }
}
