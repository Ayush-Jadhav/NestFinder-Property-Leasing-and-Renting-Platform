const propertyInfo = require("../models/PropertyInfo"); 
// const propertyProfile = require("../models/propertyProfile"); 
const User = require("../models/user"); 
const {deleteFile} = require("../utils/uploadFile");

exports.deleteProperty = async (req, res) => {
    try {
        // Get the property ID from request params
        const propertyId = req.params.propertyId;

        if (!propertyId) {
            return res.status(400).json({
                success: false,
                message: "Property ID is required",
            });
        }
        console.log(propertyId)
        
        const property = await propertyInfo.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }

        // Ensure that the property belongs to the logged-in user (authentication check)
        const userId = req.user.id; 
        if (property.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this property",
            });
        }

        // Delete images and videos from Cloudinary (if any)
        if (property.images && property.images.length > 0) {
            for (const image of property.images) {
                await deleteFile(image.url);
            }
        }

        if (property.videos && property.videos.length > 0) {
            for (const video of property.videos) {
                await deleteFile(video.url);
            }
        }

        // Delete the property from the database
        await propertyInfo.findByIdAndDelete(propertyId);

        // Remove the property from the user's "onRent" list (if it's listed there)
        await User.findByIdAndUpdate(
            userId,
            { $pull: { onRent: propertyId } },
            { new: true }
        );

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Property and associated profile deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};
