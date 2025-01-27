import { profileEndPoints } from "../api";
import { setLoading, setToken, setUser } from "../../Redux/Slices/userSlice";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const { UPDATEPROFILE_API, DELETEUSER_API } = profileEndPoints;

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETEUSER_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      localStorage.clear();
      dispatch(setUser(null));
      dispatch(setToken(null));
      toast.success("Account Deleted Successfully");
      navigate("/");
    } catch (err) {
      console.error("Account Deletion Error:", err);
      toast.error("Account Deletion Failed");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function profileUpdate(token, data) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATEPROFILE_API, data, {
        Authorization: `Bearer ${token}`,
      });

      console.log(response);
      
      if (!await response.data.success) 
      {
        throw new Error(response.data.message);
      }
        
      dispatch(setUser({...response.data.user}));
      toast.success("Profile Updated Successfully");
      
    } catch (err) {
      console.error("Profile Update Error:", err);
      console.log(err.response.data.message);
      toast.error("Profile Update Failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export function changePassword(token, data){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try{
      const response = await apiConnector("PUT",UPDATEPROFILE_API,data,{
        Authorization: `Bearer ${token}`,
      })

      if (!await response.data.success) {
        throw new Error(response.data.message);
      }
          
      toast.success("Password Changed Successfully");
        
      } catch (err) {
        console.error("Password Change Error:", err);
        toast.error("Password Change Failed");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
  }
}
