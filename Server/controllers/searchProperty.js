const propertyInfo = require("../models/PropertyInfo");

exports.searchProperties = async (req, res) => {
    try {
        const { 
            searchString,  // Text search string (for location or any other searchable field)
            latitude, 
            longitude, 
            radius,        // Radius for geospatial search (in miles or kilometers)
            priceMin,      // Minimum price
            priceMax,      // Maximum price
            lookingFor,    // "sell" or "rent"
            kindOfProperty // Type of property, e.g., "Apartment", "Independent House"
        } = req.query;

        const searchCriteria = { active: "Active" };  // Only fetch active properties

        // Text search condition (on location fields)
        if (searchString) {
            searchCriteria.$text = { $search: searchString };  // Use dynamic search string
        }

        // Geospatial search condition (if latitude, longitude, and radius are provided)
        if (latitude && longitude && radius) {
            searchCriteria.location = {
                $geoWithin: {
                    $centerSphere: [
                        [parseFloat(longitude), parseFloat(latitude)], // [longitude, latitude]
                        parseFloat(radius) / 3963.2 // Convert radius to radians (Earth's radius = 3963.2 miles)
                    ]
                }
            };
        }

        // Price range condition (if priceMin and priceMax are provided)
        if (priceMin || priceMax) {
            searchCriteria.price = {};
            if (priceMin) searchCriteria.price.$gte = parseFloat(priceMin);
            if (priceMax) searchCriteria.price.$lte = parseFloat(priceMax);
        }

        // LookingFor condition (if provided, "sell" or "rent")
        if (lookingFor) {
            searchCriteria.lookingFor = lookingFor;
        }

        // Kind of Property condition (if provided)
        if (kindOfProperty) {
            searchCriteria.kindOfProperty = kindOfProperty;
        }

        console.log(searchCriteria);

        const properties = await propertyInfo.find(searchCriteria).populate("userId","firstName email number");

        // if (!properties || properties.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No properties found matching your criteria."
        //     });
        // }

        return res.status(200).json({
            success: true,
            properties,
            message: "Properties fetched successfully."
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
};
