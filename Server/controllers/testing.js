const otpGenerator = require("otp-generator");
exports.testing = async(req,res)=>{
    try{
        // fetch data fromm req
        // const {email,number} = req.body;

        const otp = otpGenerator.generate(6,{
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        })

        return res.status(200).json({ 
            success: true, 
            message: "OTP generates and sent successfully",
            otp
        });
    }
    catch(err){
        console.error(err); // Log the error for debugging
        return res.status(500).json({ 
            success: false, 
            message: "Something went wrong. Please try again later." 
        });
    }
}

exports.sendOTP =async (req,res)=>{
    try{
        // fetch data fromm req
        // const {email,number} = req.body;

        const otp = otpGenerator.generate(6,{
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        })

        return res.status(200).json({ 
            success: true, 
            message: "OTP generates and sent successfully",
            otp
        });
    }
    catch(err){
        console.error(err); // Log the error for debugging
        return res.status(500).json({ 
            success: false, 
            message: "Something went wrong. Please try again later." 
        });
    }
}