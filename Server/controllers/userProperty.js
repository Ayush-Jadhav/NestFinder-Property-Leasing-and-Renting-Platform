const User = require("../models/user");
const propertyInfo = require("../models/PropertyInfo");

exports.userProperty = async (req,res)=>{
    try{
        const userId = req.user.id;

        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User Id not Given"
            });  
        }

        const userInfo = await User.findById(userId).populate("onRent");

        if(!userInfo){
            return res.status(400).json({
                success: false,
                message: "User Does not Exists"
            }); 
        }

        const MyProperties =  userInfo.onRent;

        res.status(200).json({
            success: true,
            message: "user's properties fetch successfullly",
            MyProperties,
        })

    }
    catch(err){
        console.error(err); 
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }


}