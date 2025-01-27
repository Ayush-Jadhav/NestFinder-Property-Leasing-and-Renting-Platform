const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    SENDOTP_API: BASE_URL + "api/v1/generateOTP",
    SIGNUP_API: BASE_URL + "api/v1/signUp",
    LOGIN_API: BASE_URL + "api/v1/logIn",
    RESETPASSTOKEN_API: BASE_URL + "api/v1/sendResetPasswordMail", //first send token to emain then reset from token will be done
    RESETPASSWORD_API: BASE_URL + "api/v1/resetPassword",
  }

  export const profileEndPoints = {
    UPDATEPROFILE_API: BASE_URL + "api/v1/update/UserInfo",
    DELETEUSER_API: BASE_URL + "api/v1/deleteUser",
  }

  export const PropertyEndPoints = {
    CREATEPROPERTY_API: BASE_URL + "api/v1/createProperty",
    DELETEPROPERTY_API: BASE_URL + "api/v1/Property/delete",
    UPDATEPROPERTY_API: BASE_URL + "api/v1/update/Property",
    MYPROPERTIES_API: BASE_URL + "api/v1/User/MyProperties",
  }

  export const nearPropertyEndPoints = {
    SEARCHPROPERTY_API: BASE_URL + "api/v1/getProperty",
  }