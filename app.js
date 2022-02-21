"use strict";
var createError = require("http-errors");
var express = require("express");
const axios = require('axios');
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
var logger = require("morgan");
var { verifyToken } = require('./middleware/auth')
var fileUpload = require('express-fileupload')
const mongoose = require("mongoose");
require("dotenv").config();
// connect to database
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected")
    app.listen(7000,()=>{
      console.log('listening at 7000')
    })
  })
  .catch((err) => {
    console.log(err);
  });


var swaggerUI = require('swagger-ui-express')
var swaggerJsDoc = require('swagger-jsdoc')
const options = {
  definition:{
    openapi:"3.0.0",
    info : {
      title : "UniMentor API",
      version : "1.0.0",
      description : "All APIS used in unimentor backend"
    },
    servers:[
      {
        url : "https://uni-mentor-backend.vercel.app/"
      }  
    ],
  },
    apis : ["./routes/*.js"]
}
const specs = swaggerJsDoc(options)


// adding different routes
var studentRouter = require("./routes/studentRoutes");
var adminRouter = require("./routes/adminRoutes");
var universityRouter = require("./routes/universityRoutes");
var commonRouter = require('./routes/authRoutes')
var agentRouter = require('./routes/agentRoutes')
var app = express();
const cors = require('cors');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(fileUpload())

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

// Routes for diferent users

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs))
app.use("/university",  universityRouter);
app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/agent",agentRouter);
app.use("/", commonRouter);



app.get('/countries',async (req,res)=>{
  var req = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken",{
    headers : { 
    "Accept": "application/json",
    "api-token": "HoNoMGoDaJKuLABZ8nhhz0VTwgUcaxf3iOWUPuYf9MyPVV4E6KApTVrAF6auT4BvHds",
    "user-email": "priyankaengg1111@gmail.com"
  }});

  console.log(req.data)
  if(!req.data || !req.data.auth_token){
    return res.status(400).json({
      success:false,
      message:"Some error occured"
    })
  }
    var rem = await axios.get("https://www.universal-tutorial.com/api/countries/",{
      headers:{
        "Authorization":"Bearer "+req.data.auth_token,
        'Content-Type': 'application/json'
      }
    })
    if(!rem){
      return res.status(400).json({
        success:false,
        message:"Some error occured"
      })
    }
    rem = rem.data
    return res.status(200).json({
      success:true,
      result:rem
    })
})

app.get('/states/:country',async (req,res)=>{
  console.log(process.env.COUNTRY_API_TOKEN)
  const country = req.params.country
  var req = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken",{
    headers : { 
    "Accept": "application/json",
    "api-token": "HoNoMGoDaJKuLABZ8nhhz0VTwgUcaxf3iOWUPuYf9MyPVV4E6KApTVrAF6auT4BvHds",
    "user-email": "priyankaengg1111@gmail.com"
  }});

  if(!req.data || !req.data.auth_token){
    return res.status(400).json({
      success:false,
      message:"Some error occured"
    })
  }
  var rem = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`,{
    headers:{
      "Authorization":"Bearer "+req.data.auth_token,
      'Content-Type': 'application/json'
    }
  })
  if(!rem){
    return res.status(400).json({
      success:false,
      message:"Some error occured"
    })
  }
  rem = rem.data
  return res.status(200).json({
    success:true,
    result:rem
  })
})


app.get('/cities/:state',async (req,res)=>{
  const state = req.params.state
  console.log(process.env.COUNTRY_API_TOKEN)
  var req = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken",{
    headers : { 
    "Accept": "application/json",
    "api-token": "HoNoMGoDaJKuLABZ8nhhz0VTwgUcaxf3iOWUPuYf9MyPVV4E6KApTVrAF6auT4BvHds",
    "user-email": "priyankaengg1111@gmail.com"
  }});


  if(!req.data || !req.data.auth_token){
    return res.status(400).json({
      success:false,
      message:"Some error occured"
    })
  }
  
  var rem = await axios.get(`https://www.universal-tutorial.com/api/cities/${state}`,{
    headers:{
      "Authorization":"Bearer "+req.data.auth_token,
      'Content-Type': 'application/json'
    }
  })

  if(!rem){
    return res.status(400).json({
      success:false,
      message:"Some error occured"
    })
  }
  rem = rem.data
  return res.status(200).json({
    success:true,
    result:rem
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    success:false,
    message:"Internal Server Error",
    error:err
  });
});

module.exports = app;
