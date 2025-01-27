const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.auth = async (req,res,next)=>{
    try{
        // fetching token from body req or cookies
        const token = 
            req.get("Authorization")?.replace("Bearer ", "") || // From headers (Bearer <token>)
            req.cookies.token ||                        // From cookies
            req.body.token;                             // From body

        // validate cookie
        if(!token)
        {
            return res.status(400).json({
                success: false,
                message: "token not found, please login",
            })
        }

        // check token, if correct or not
        try{
            const decode = jwt.verify(token, process.env.SIGNATURE);
            console.log(decode);
            req.user = decode;


            // Check if the user exists
            const user = await User.findById(decode.id);
            if (!user) {
                return res.status(401).json({ 
                    success: false, 
                    message: "User does not exist. Please login again." 
                });
            }
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "token not matched",
            })
        }

        next();
    }
    catch(err){
        console.error(err); // Log the error for debugging
        return res.status(500).json({ 
            success: false, 
            message: "Something went wrong. Please try again later." 
        });
    }
}