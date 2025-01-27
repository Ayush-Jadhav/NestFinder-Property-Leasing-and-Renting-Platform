const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.userInfoUpdate = async (req,res)=>{
    try{
        // fetch userId 
        const userId = req.user.id;

        const {firstName,lastName, email, number, oldPassword, newPassword} = req.body;

        // check if user exists or not
        const userInfo = await User.findById(userId);

        if(!userInfo)
        {
            res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        if(firstName){
            userInfo.firstName = firstName;
        }

        if(lastName){
            userInfo.lastName = lastName;
        }

        if(email){
            userInfo.email = email;
        }

        if(number){
            userInfo.number = number;
        }

        if(newPassword){
            // check if given password is right or not
            if(!await bcrypt.compare(oldPassword,userInfo.password)){
                return res.status(400).json({
                    success: false,
                    message: "Incorrect Password",
                })
            }

            // hash password before storing
            const hashPassword = await bcrypt.hash(newPassword,10);
                
            userInfo.password = hashPassword;
        }

        userInfo.save();
        const user = userInfo.toObject();
        user.password = undefined;
        console.log(user);
        return res.status(200).json({
            success: true,
            message: "User information updated successfully",
            user,
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