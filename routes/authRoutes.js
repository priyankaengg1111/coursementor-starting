'use strict';
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const universityModel = require('../models/universityModel')
var router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Student
 *  description: All API information for student portal
 */
router.get('/',(req,res)=>{
  res.status(200).json({
    success:true,
    message:"Please go to /api-docs for documentation of apis"
  })
})

router.get('/universities',(req,res)=>{
  universityModel.find({},{_id:1,name:1,email:1},(err,universities)=>{
    if(err){
      return res.status(501).json({
        success:false,
        message:"Some error ocurred in fetching university Data"
      })
    }
    if(!universities){
      return res.status(501).json({
        success:false,
        message:"Some error ocurred in fetching Univerisities"
      })
    }
    return res.status(200).json({
      success:true,
      universities
    })
  })
})


module.exports = router;
