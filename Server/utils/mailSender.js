const nodemailer = require("nodemailer");

exports.SendMail = async ({to,subject,body})=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS,
            }
        })
        
        const mailResponse = await transporter.sendMail({
            from: `Property On Rent`,
            to: `${to}`,
            subject: `${subject}`,
            html: `${body}`,
        })

        return mailResponse;
    }
    catch(err){
        console.log("error in nodemailer",err);
    }
}