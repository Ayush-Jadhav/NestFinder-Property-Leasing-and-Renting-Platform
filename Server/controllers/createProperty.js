const User = require("../models/user");
const propertyInfo = require("../models/PropertyInfo");
const {uploadFile} = require("../utils/uploadFile");
const mongoose  = require("mongoose")
// const propertyProfile = require("../models/propertyProfile");

exports.createProperty = async (req,res)=>{
    try{
        // get user id from req after verify token
        const userId = req.user.id;

        // fetch all information
        const {kindOfProperty,lookingFor,city,state,locality,street,price,plotArea,furnishing,willingToGive} = req.body;

        console.log("req.files",req.files);

        // validate information
        if(!kindOfProperty || !lookingFor || !price || !city || !state || !locality || !street || !plotArea || !furnishing || !willingToGive){
            return res.status(400).json({
                success: false,
                message: "please fill all information"
            })
        }

        // find user 
        const user = await User.findById(userId);

        if(!user)
        {
            return res.status(400).json({
                success: false,
                message: "user not found",
            })
        }


        // create propertyInfo
        const property = await propertyInfo.create({
                                                    userId: user._id,
                                                    active: "Active",
                                                    kindOfProperty,
                                                    lookingFor,
                                                    location: {
                                                        state: state,
                                                        city: city,
                                                        locality: locality,
                                                        street: street,
                                                    },                                                    
                                                    price,
                                                    plotArea: plotArea,
                                                    furnishing: furnishing,
                                                    willingToGive:willingToGive,
                                                });


        if (!req.files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const files = req.files; // All files from the request
        const uploadedUrls = [];

        // Iterate over the files object
        for (const key in files) {
            if (Object.hasOwnProperty.call(files, key)) {
                const file = files[key];

                // Upload each file to Cloudinary
                if(key==="video")
                {
                    const uploadedUrl = await uploadFile({
                        file,
                        folderName:'propertyVideo' // Adjust folder name if needed
                    });
                    property.videos.push({url:uploadedUrl});
                }
                else{
                    const uploadedUrl = await uploadFile({
                        file,
                        folderName:'propertyPhotos' // Adjust folder name if needed
                    });
                    property.images.push({url:uploadedUrl}); 
                }

            }}


        await property.save();

        // push propertyInfo into owner profile
        await User.findByIdAndUpdate({_id: user._id},
            {
                $push: {onRent:property._id},
            },
            {new: true}
        );

        res.status(200).json({
            success: true,
            message: "property created successfully"
        })
    }
    catch(err){
        console.error(err); // Log the error for debugging
        return res.status(500).json({ 
            success: false, 
            message: "Something went wrong. Please try again later." 
        });
    }
}



