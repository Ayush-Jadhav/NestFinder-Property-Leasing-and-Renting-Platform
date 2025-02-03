const User = require("../models/user");
const propertyInfo = require("../models/PropertyInfo");
const { uploadFile } = require("../utils/uploadFile");
const mongoose = require("mongoose");

exports.createProperty = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        // Get user ID from token
        const userId = req.user.id;
        
        // Fetch property details from request
        const { kindOfProperty, lookingFor, city, state, locality, street, price, plotArea, furnishing, willingToGive } = req.body;
        
        console.log("req.files", req.files);

        // Validate input fields
        if (!kindOfProperty || !lookingFor || !price || !city || !state || !locality || !street || !plotArea || !furnishing || !willingToGive) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Find the user
        const user = await User.findById(userId).session(session);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found.",
            });
        }

        // Ensure files are present
        if (!req.files) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        const files = req.files;
        const uploadedImages = [];
        const uploadedVideos = [];

        // Upload files before creating property
        for (const key in files) {
            if (Object.hasOwnProperty.call(files, key)) {
                const file = files[key];

                try {
                    if (key === "video") {
                        const uploadedUrl = await uploadFile({ file, folderName: 'propertyVideo' });
                        uploadedVideos.push({ url: uploadedUrl });
                    } else {
                        const uploadedUrl = await uploadFile({ file, folderName: 'propertyPhotos' });
                        uploadedImages.push({ url: uploadedUrl });
                    }
                } catch (uploadError) {
                    await session.abortTransaction();
                    session.endSession();
                    console.error(uploadError);
                    return res.status(500).json({
                        success: false,
                        message: "File upload failed. Please try again.",
                    });
                }
            }
        }

        // Create propertyInfo only after successful uploads
        const property = await propertyInfo.create([{
            userId: user._id,
            active: "Active",
            kindOfProperty,
            lookingFor,
            location: {
                state,
                city,
                locality,
                street,
            },
            price,
            plotArea,
            furnishing,
            willingToGive,
            images: uploadedImages,
            videos: uploadedVideos,
        }], { session });

        // Push property into user's profile
        await User.findByIdAndUpdate(user._id, {
            $push: { onRent: property[0]._id },
        }, { new: true, session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Property created successfully."
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
};
