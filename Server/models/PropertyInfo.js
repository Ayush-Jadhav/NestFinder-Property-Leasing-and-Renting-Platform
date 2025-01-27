const mongoose = require("mongoose");

const propertyInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    active: {
        type: String,
        enum: ["Active", "Inactive"],
        index: true,   // active,inactive indexing 
    },
    kindOfProperty: {
        type: String,
        enum: ["Flat/Apartment", "Independent House/Villa", "Independent/Builder Floor", "Serviced Apartment"],
        required: true,
    },
    lookingFor: {
        type: String,
        enum: ["Sell", "Rent/Lease"], // Fixed values for consistency
        required: true,
        index: true,  // corrected typo here
    },
    location: {
        state: { type: String },
        city: { type: String },
        locality: { type: String },
        street: { type: String },
        houseNumber: { type: String },
        coordinates: {
            type: { type: String, enum: ['Point'] }, // added required: true here
            coordinates: { type: [Number] }, // added required: true here
        }
    },
    plotArea: {
        type: Number,
        required: true,
        default: 0,
    },
    furnishing: {  // Furnished, semiFurnished, un-Furnished
        type: String,
        enum: ["Furnished", "Semi-furnished", "Un-furnished"],
        required: true,
        default: null,
    },
    willingToGive: { // single men, single women, family
        type: String,
        enum: ["Single-men", "Single-women", "Family"],
        required: true,
        default: null,
    },
    price: {
        type: Number,
        required: true,
        index: true, // price indexing
    },
    images: [{
        url: { type: String }   // Image URL
    }],
    videos: [{
        url: { type: String } // URLs or file paths
    }],
});

// Indexing for text and geospatial queries
propertyInfoSchema.index({
    "location.state": "text",
    "location.city": "text",
    "location.locality": "text",
    "location.street": "text",
});
propertyInfoSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("propertyInfo", propertyInfoSchema);
