'use strict';
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const {
  ACCESS_TOKEN: ACCESS_TOKEN
} = require('../../core/config');

module.exports.loginController = async ({ body }, res) => {
  console.log(body)
  const isValid = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
    type:joi.string().required()
  });

  if (isValid.validate(body).error) {
    return res.status(201).json({ 
      success : false,message: "Input is invalid" });
  }
  try{
    const user = await User.findOne({ email: body.email });
   // console.log(user)
    if (!user) {
        return res.status(201).json({
          success : false,
          message: "User not found"
         });
    }
    console.log("hello workd")
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    console.log(user)
    if (!isPasswordValid) {
      return res.status(201).json({ success : false, message: "Invalid Password" });
    }
    console.log("i am done too")
    const accessToken = jwt.sign(
      {
        userID: String(user._id),
        iat: new Date().getTime()
      },
      ACCESS_TOKEN.secret,
      { expiresIn: ACCESS_TOKEN.validity }
    );

    try {
      await user.save();
    } 
    catch {
      return res.status(400).json({ 
        success : false,
        message: "Unable to login" });
    }
    
    return res.status(200).json({ 
      success : true,
      message: "token", 
      token:accessToken,
      type:user.type });
  }
  
  catch(e){
    console.log(e)
    return res.status(201).json({
      success : false, message: "Some Database connection error" });
  }

};
