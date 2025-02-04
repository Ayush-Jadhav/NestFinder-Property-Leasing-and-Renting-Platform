const User = require("../models/user");
const bcrypt = require('bcryptjs');
const {SendMail} = require("../utils/mailSender");

exports.resetPasswordToken = async (req,res) =>{
    try{
        // get email from req.body
        const {email} = req.body;

        // check if user exist or not
        const userInfo = await User.findOne({email:email});

        if(!userInfo || userInfo===undefined)
        {
            return res.status(500).json({
                success: false,
                message: "user doesn't exist",
            })
        }

        // generate random token
        const token = crypto.randomUUID();

        // insert token info into user
        const updateTokenInfo = await User.findOneAndUpdate({email:email},
            {
                resetPasswordToken: token,
                resetPasswordExpire: Date.now() + 300*1000
            },
            {new: true}
        );

        // create new URL 
        const URL = `http://localhost:3000/update-password/${token}`;
        console.log("URL",URL);

        // send email
        await SendMail({
            to: email,
            subject: "Password Reset Link",
            body: `Password reset link: ${URL}`,
        });
        

        return res.status(200).json({
            success: true,
            message: "Reset Password Link Send Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}


exports.resetPassword = async (req,res)=>{
    try{
        // get token for search userInfo
        const {password, confirmPassword, token} = req.body;

        // validate information
        if(password!==confirmPassword){
            return res.status(500).json({
                success: false,
                message: "confirm password is not same",
            })
        }

        const userInfo = await User.findOne({resetPasswordToken: token});

        // find user using token
        if(!userInfo || userInfo===undefined)
        {
            return res.status(500).json({
                success: false,
                message: "Invalid Token",
            })
        }

        // check if token expired or not
        if(Date.now() >= userInfo.resetPasswordExpire)
        {
            return res.status(500).json({
                success: false,
                message: "Link Expired, try again",
            })
        }

        // encrypt password before update
        const hashPassword = await bcrypt.hash(password,10);

        userInfo.password = hashPassword;
        await userInfo.save();

        return res.status(200).json({
            success: true,
            message: "Password Reset successfully",
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Password Reseting error, please try again",
        })
    }
}