const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");
require("dotenv").config();

exports.logIn = async (req,res)=>{
    try{
        // fetch data from req.body
        const {email,password} = req.body;

        // validate data 
        if(!email || !password){
            return res.status(400).json({ 
                success: false, 
                message: "Provide all require information" 
            });
        }

        const userInfo = await User.findOne({email});

        // check if user exists or not
        if(userInfo)
        {
            
            // compare password
            const comparePass = await bcrypt.compare(password,userInfo?.password)
            if(!comparePass){
                return res.status(400).json({ 
                    success: false, 
                    message: "Incorrect Password" 
                });
            }
            
            // if password matched and user details exists, generate jwt token
            const payload = {
                email,
                id: userInfo._id,
            }
            
            const token = jwt.sign(
                payload,
                process.env.SIGNATURE,
                {
                    expiresIn: "5d",
                }
            )
            
            // userInfo = userInfo.toObject();
            userInfo.token = token;
            userInfo.password = undefined;
            
            const option = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            
            res.cookie("token",token,option).status(200).json({
                success: true,
                token,
                userInfo,
                message: "User logged In successfully"
            })
        }
        else{
            return res.status(404).json({ 
                success: false, 
                message: "User is not found, please signUp" 
            });
        }
    }
    catch(err){
        console.error(err); // Log the error for debugging
        return res.status(500).json({ 
            success: false, 
            message: "Something went wrong. Please try again later." 
        });
    }
}