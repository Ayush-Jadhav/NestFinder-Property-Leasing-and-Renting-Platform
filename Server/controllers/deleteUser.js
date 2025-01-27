const User = require("../models/user"); 
const propertyInfo = require("../models/PropertyInfo"); 
// const propertyProfile = require("../models/propertyProfile"); 
const { deleteFile } = require('../utils/uploadFile'); 

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Fetch and delete properties
        const properties = await propertyInfo.find({ userId });

        for (const property of properties) {
            // Delete property images from Cloudinary (if any)
            if (property.images && property.images.length > 0) {
                for (const image of property.images) {
                    await deleteFile(image.url); // Call the deleteFile utility
                }
            }

            // Delete property videos from Cloudinary (if any)
            if (property.videos && property.videos.length > 0) {
                for (const video of property.videos) {
                    await deleteFile(video.url); // Call the deleteFile utility
                }
            }

            // Delete property and profile data from the database
            await propertyInfo.findByIdAndDelete(property._id);
            // await propertyProfile.findByIdAndDelete(property.propertyProfile);
        }

        // Delete user from the database
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message: "User and all associated data deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};
