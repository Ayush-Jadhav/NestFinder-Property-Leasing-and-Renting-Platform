const express = require("express");
const { createProperty } = require("../controllers/createProperty");
const { deleteProperty} = require("../controllers/deleteProperty.js");
const {deleteUser} = require("../controllers/deleteUser.js");
const { logIn } = require("../controllers/logIn.js");
const { signUp, sendOTP } = require("../controllers/signUp.js");
const { userInfoUpdate } = require("../controllers/updateUserInfo.js");
const { updatePropertyInfo, updatePropertyMedia } = require("../controllers/updateProperty.js");
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword.js");
const { searchProperties } = require("../controllers/searchProperty.js");
const { userProperty } = require("../controllers/userProperty.js");
const { auth } = require("../middleware/auth.js");
const Router = express.Router();

Router.post("/createProperty",auth,createProperty);
Router.delete("/Property/delete/:propertyId",auth, deleteProperty);
Router.delete("/deleteUser",auth,deleteUser);
Router.post("/login",logIn);
Router.post("/signUp",signUp);
Router.post("/generateOTP",sendOTP);
Router.put("/update/UserInfo",auth,userInfoUpdate);
Router.put("/update/Property/:propertyId",auth,updatePropertyInfo);
Router.post("/sendResetPasswordMail",resetPasswordToken);
Router.post("/resetPassword",resetPassword);
Router.get("/getProperty",searchProperties);
Router.get("/User/MyProperties",auth,userProperty);

const { testing } = require("../controllers/testing.js");
Router.get("/testing",testing);

module.exports = Router;