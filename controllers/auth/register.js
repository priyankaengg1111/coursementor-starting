'use strict';
const Joi = require("joi");
const User = require("../../models/userModel");
const bycrypt = require('bcrypt');
const adminModel = require("../../models/adminModel");
const universityModel = require("../../models/universityModel");
const studentModel = require("../../models/studentModel");

module.exports.registerController = async ({ body }, res) => {
  const isValid = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    type : Joi.string().alphanum().min(1).max(4).required()
  }).validate(body, { abortEarly: false, allowUnknown: false });

  if (isValid.error) {
    return res
      .status(201)
      .json({ success : false,message: "Input is invalid", error: isValid.error.details });
  }

  try{
  const alreadyUser = await User.findOne({ email: body.email }).lean();

  if (alreadyUser) {
    return res.status(201).json({ success : false,message: "Email already registered" });
  }

  try{
    console.log("working")
    bycrypt.genSalt(10, function(err, salt) {
      if(err)
        throw err
        bycrypt.hash(body.password, salt, async (err, hash) => {
          if(err)
            throw err
          body.password = hash
          const newUser = new User(body);
          
          if(body.type == 1){
            var adminData = new adminModel();
            
            try {
              await adminData.save();
            } catch {
              return res.status(400).send({ success : false,message: "Unable to make admin" });
            }
            newUser.adminData = adminData  
          }
          else if(body.type == 2){
            var universityData = new universityModel();
            try{
              await universityData.save();
            }
            catch{
              return res.status(400).send({ success : false,message: "Unable to add universty data" });
            }
            newUser.universityData = universityData;
          }
          else if(body.type == 3){
            
            var studentData = new studentModel();
            try{
              await studentData.save();
            }
            catch{
              return res.status(400).send({ success : false,message: "Unable to add student data" });
            }
            newUser.studentData = studentData;
          }
          else if(body.type == 4){
            
            var agentData = new agentModel();
            try{
              await agentData.save();
            }
            catch{
              return res.status(400).send({ success : false,message: "Unable to add agent data" });
            }
            newUser.agentData = agentData;
          }

          try {
            await newUser.save();
          } catch {
            return res.status(400).send({success : false, message: "Unable to save user" });
          }
          
          return res.status(200).send({ 
            success : true,message: "User Created!" });
        })
    });  
  }
  catch{
    return res.status(400).send({
      message:"Not able to encrypt password"
    })
  }
}
catch{
  return res.status(400).send({
    success:false,
    message:"DATABASE ERROR"
  })
}

};
