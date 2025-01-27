import { PropertyEndPoints } from "../api";
import toast from "react-hot-toast";
import { setLoading } from "../../Redux/Slices/userSlice";
import { apiConnector } from "../apiConnector";
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetProp, setProp, stepNum } from "../../Redux/Slices/propSlice";
import { resetPropCardData } from "../../Redux/Slices/propUpdateSlice";

const {
    CREATEPROPERTY_API,
    DELETEPROPERTY_API,
    UPDATEPROPERTY_API,
} = PropertyEndPoints;

export function postProperty(token,formData,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
          const response = await apiConnector("POST",CREATEPROPERTY_API,formData,{
            Authorization: `Bearer ${token}`,
          })
    
          if (!await response.data.success) {
            throw new Error(response.data.message);
          }
              
          toast.success("Property Posted Successfully");
          navigate("/dashboard/my-Properties");
          dispatch(resetProp());
          dispatch(stepNum(1));
            
          } catch (err) {
            console.error("Property Post Error:", err);
            toast.error("Property Post Failed");
          } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
          }
      }
}

export function deleteProperty(token,propertyId){
  console.log(propertyId)
  console.log(token);
  return async(dispatch)=>{
      dispatch(setLoading(true));
      const toastId = toast.loading("Deleting...");
      try{
        const response = await apiConnector("DELETE",`${DELETEPROPERTY_API}/${propertyId}`,null,{
          Authorization: `Bearer ${token}`,
        })
  
        if (!await response.data.success) {
          throw new Error(response.data.message);
        }
            
        toast.success("Property Deleted Successfully");          
        } catch (err) {
          console.error("Property Deletion Error:", err);
          toast.error("Property Deletion Failed");
        } finally {
          dispatch(setLoading(false));
          toast.dismiss(toastId);
        }
    }
}

export function updateProperty(token,propertyId,data,navigate){
  console.log("token",token);
  console.log("propertyId",propertyId);
  console.log("formData",data)
  return async(dispatch)=>{
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try{
      const response = await apiConnector("PUT",`${UPDATEPROPERTY_API}/${propertyId}`,data,{
        Authorization: `Bearer ${token}`,
      })

      if (!await response.data.success) {
        throw new Error(response.data.message);
      }
          
      toast.success("Property Updated Successfully");
      navigate("/dashboard/my-Properties");
      dispatch(resetPropCardData());
        
      } catch (err) {
        console.error("Property Update Error:", err);
        toast.error("Property  Failed");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
  }
}
