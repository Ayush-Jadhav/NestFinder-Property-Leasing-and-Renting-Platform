import { endpoints } from "../api";
import {apiConnector} from "../apiConnector";
import { setLoading } from "../../Redux/Slices/authSlice";
import toast from "react-hot-toast";
import {setUser, setToken} from "../../Redux/Slices/userSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints;

// const navigate = useNavigate();

export function sendOTP(email,number,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                number,
            })
            
            console.log("response:",response);
            
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            
            toast.success("OTP sent Successfully");
            navigate("/verify-email");
        }
        catch(err){
            console.log("Error while sending otp",err);
            toast.error("OTP Send Error");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function signUp({firstName, lastName, email, number, password, confirmPassword, otp}, navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                number,
                password,
                confirmPassword, 
                otp
            })
            console.log("response",response);

            // if(!response.data.success){
            //    throw new Error(response.data.message) 
            // }

            toast.success("SigUp Successfully");
            navigate("/SignUp")
        }
        catch(err){
            console.log("Error while SignUp",err);
            toast.error("SignUp Error")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}


export function logIn({email,password},navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("loading");
        try{
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password,
            })

            if(!response.data.success){
                throw new Error(response.data.status);
            }
            
            // toast.message(response.data.message);
            toast.success("Logged In Successfully")
            dispatch(setUser(response.data.userInfo));
            dispatch(setToken(response.data.token));
            navigate("/dashboard/my-Properties");
        }
        catch(err){
            console.log("Error while SignUp",err);
            toast.error("Incorrect Password or Email")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));

    }
}

export function logOut(navigate){
    console.log("LogOut")
    return (dispatch)=>{
        dispatch(setLoading(true))
        const toastId = toast.loading("loading")
        try{
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            dispatch(setToken(null));
            dispatch(setUser(null));
            toast.success("Logged Out Successfully")
            navigate("/")
        }
        catch(err){
            console.log(err);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) =>{
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true));
  
      try {
       const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});
       console.log("RESETPASSTOKEN_API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if(!response.data.success){
          throw new Error(response.data.message)
        }
      
        toast.success("Mail Sent successful")
        setEmailSent(true);
      } catch (error) {
        console.log("RESETPASSTOKEN_API ERROR............", error)
        toast.error("Could Not Send Mail")
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }


  export function resetPassword(password, confirmPassword, token, navigate) {
    return async(dispatch)=>{
      const toastId = toast.loading("Loading in reset password")
      dispatch(setLoading(true));
  
      try {
        const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token})
  
        console.log("RESETPASSWORD_API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if(!response.data.success){
          throw new Error(response.data.message)
        }
      
        toast.success("Password reset successful")
        navigate('/SignUp')
  
      } catch (error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
      }
  
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }