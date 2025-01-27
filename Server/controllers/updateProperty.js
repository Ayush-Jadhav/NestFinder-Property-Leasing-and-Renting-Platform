const propertyInfo = require("../models/PropertyInfo");
const User = require("../models/user");
const { uploadFile, deleteFile } = require("../utils/uploadFile");

exports.updatePropertyInfo = async (req, res) => {
    try {
        const userId = req.user.id;  
        const propertyId = req.params.propertyId;

        const property = await propertyInfo.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Ensure the authenticated user is the owner of the property
        if (property.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this property"
            });
        }
        
        const { active, kindOfProperty, lookingFor, city, state, locality, street, price, plotArea, furnishing, willingToGive, removePhotos, removeVideos } = req.body;

        console.log(req.body);
        
        // Update the propertyInfo fields if they are provided
        if (active) property.active = active;
        if (kindOfProperty) property.kindOfProperty = kindOfProperty;
        if (lookingFor) property.lookingFor = lookingFor;
        if (price) property.price = price;
        if (plotArea) property.plotArea = plotArea;
        if (furnishing) property.furnishing = furnishing;
        if (willingToGive) property.willingToGive = willingToGive;
        if (city) property.location.city = city;
        if (state) property.location.state = state;
        if (locality) property.location.locality = locality;
        if (street) property.location.street = street;

        // Handle removePhotos if provided
        if (removePhotos && removePhotos.length > 0) {
            console.log("removePhotos", removePhotos);
            const Photos = Array.isArray(req.body.removePhotos) ? req.body.removePhotos : [req.body.removePhotos];
            for (const image of Photos) {
                await deleteFile(`${image}`);
            }
            property.images = property.images.filter(image => 
                !Photos.some(removeImage => removeImage === image.url)
            );
        }
        
        if (removeVideos && removeVideos.length > 0) {
            console.log("removeVideos", removeVideos);
            const Videos = Array.isArray(req.body.removeVideos) ? req.body.removeVideos : [req.body.removeVideos];
            for (const video of Videos) {
                await deleteFile(`${video}`);
            }
            property.videos = property.videos.filter(video => 
                !Videos.some(removeVideo => removeVideo === video.url)
            );
        }
        
        
        
        // Handle file uploads for new images and videos
        if (req.files) {
            // Handle images
            const images = Array.isArray(req.files['image[]']) ? req.files['image[]'] : [req.files['image[]']].filter(Boolean);
            
            for (const image of images) {
                const uploadedUrl = await uploadFile({
                    file: image,
                    folderName: 'propertyPhotos',
                });
                property.images.push({ url: uploadedUrl });
            }
        
            // Handle videos
            const videos = Array.isArray(req.files['video[]']) ? req.files['video[]'] : [req.files['video[]']].filter(Boolean);
        
            for (const video of videos) {
                const uploadedUrl = await uploadFile({
                    file: video,
                    folderName: 'propertyVideos',
                });
                property.videos.push({ url: uploadedUrl });
            }
        }

        // Save the updated property info
        await property.save();

        res.status(200).json({
            success: true,
            message: "Property information updated successfully",
            property
        });
    } catch (err) {
        console.error(err); 
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
};
