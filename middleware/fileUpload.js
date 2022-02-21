'use strict';
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {
  ACCESS_TOKEN: ACCESS_TOKEN
} = require('../core/config');
const mongoose = require("mongoose");
const studentModel = require("../models/studentModel");
const { raw } = require("body-parser");

const Path = require('path');
const fileStack = require('filestack-js')
const apikey = process.env.FILESTACK_API_KEY;
const client = fileStack.init(apikey);

module.exports={
  
  fileUpload:async function(req,res,next){
    if (!req.files) {
        next();    
    }
    else{
        var files = req.files;
        Object.keys(req.files).map((key,index,row)=>{
            var path =  Path.join(__dirname, files[key].name);
            files[key].mv(path,async (err) => {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        error:(err),
                        message:"Error in file upload"
                    })
                }
                req.body[key]=path
                try{
                    client.upload(req.body[key]).then((imageUploadResponse)=>{
                        
                        if(!imageUploadResponse){
                            return res.status(500).json({
                                message:"Error in uploading file",
                                success:false
                            })       
                        }
                        req.body[key] = !imageUploadResponse.url ? "dummy" : imageUploadResponse.url;
                        if(index + 1 == row.length){
                            console.log(index+1)
                            next();
                        }
                    });
                }          
                catch(e){
                    req.body[key]=null
                    return res.status(500).json({
                        success:false,
                        message: 'Error uploading picture',
                        error: e
                    });
                }
            });
        });      
    }
  },

  
}
