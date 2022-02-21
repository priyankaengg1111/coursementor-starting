const nodemailer = require('nodemailer')

let transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports ={
    sendEmail:(req,res,message)=>{
        transport.sendMail(message, async function(err, info) {
            console.log(err);  
            if (err) {
                return res.status(400).send({success:false,message:"error in sending password"});    
            }
        });
    }
}
