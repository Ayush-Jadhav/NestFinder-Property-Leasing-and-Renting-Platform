const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    }
    ,
    email: {
        type: "String",
        require: true,
        uniqueCaseInsensitive: true, // Ensures uniqueness while ignoring case sensitivity for string fields.
    },
    number: {
        type: "Number",
        require: true,
    },
    password: {
        type: "String",
        require: true,
    },
    onRent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "propertyInfo"
    }],
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
    image: {
        type : String,
    }
})

module.exports = mongoose.model("User",User);