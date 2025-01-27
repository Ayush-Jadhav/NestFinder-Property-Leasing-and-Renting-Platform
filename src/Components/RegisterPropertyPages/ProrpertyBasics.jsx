import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../IconBtn";
import "./Register page Style/propertyBasics.css"
import { useDispatch, useSelector } from "react-redux";
import { setProp, stepNum } from "../../Redux/Slices/propSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export const ProrpertyBasics = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {prop} = useSelector((state)=>state.prop);

  const [selectedPurpose, setSelectedPurpose] = useState(prop?.lookingFor || "");
  const [selectedPropertyType, setSelectedPropertyType] = useState(prop?.kindOfProperty || "");
  const [purposeError,setPurposeError] = useState(false);
  const [propertyTpeError,setPropertyTypeError] = useState(false);


  const submitProfileForm = (data) => {
    if(selectedPurpose==="")
    {
      setPurposeError(true);
    }
    
    if(selectedPropertyType==="")
    {
      setPropertyTypeError(true);
    }
    
    if(selectedPurpose!=="" && selectedPropertyType!=="")
    {
      setPurposeError(false);
      setPropertyTypeError(false);
      data.kindOfProperty = selectedPropertyType;
      data.lookingFor = selectedPurpose
      dispatch(setProp(data));
      dispatch(stepNum(2));
      navigate('/Register/PostProperty/Address');
    }

  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="form-section">
        <h3 className="backToDash" onClick={()=>navigate("/dashboard/my-Properties")}><MdOutlineKeyboardBackspace /> <span>Back</span></h3>
        <h2 className="form-section-title">Fill Out Basic Details</h2>

        {/* Purpose Selection */}
        <div className="form-group">
          <label className="form-label">I'm looking to</label>
          <div className="button-container">
            {["Sell", "Rent/Lease"].map((purpose) => (
              <button
                key={purpose}
                type="button"
                className={`choice-button ${
                  selectedPurpose.includes(purpose) ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedPurpose(purpose);
                  setPurposeError(false)
                }}
              >
                {purpose}
              </button>
            ))}
          </div>
          {purposeError && (
            <span className="error-message">Please select a purpose.</span>
          )}
        </div>

        {/* Property Type Selection */}
        <div className="form-group">
          <label className="form-label">Property Type</label>
          <div className="button-container">
            {["Flat/Apartment", "Independent House/Villa", "Serviced Apartment", "Independent/Builder Floor"].map(
              (type) => (
                <button
                  key={type}
                  type="button"
                  className={`choice-button ${
                    selectedPropertyType.includes(type) ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedPropertyType(type);
                    setPropertyTypeError(false)}}
                >
                  {type}
                </button>
              )
            )}
          </div>
          {propertyTpeError && (
            <span className="error-message">
              Please select at least one property type.
            </span>
          )}
        </div>

        {/* Price Input */}
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price Details
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="₹ Expected Price"
            className="form-input"
            {...register("price", {
              required: {
                value: true,
                message: "Please enter price detail",
              },
            })}
            defaultValue={prop?.price}
          />
          {errors.price && (
            <span className="error-message">{errors.price.message}</span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-actions"> 
        <IconBtn type="submit" text="Post and Continue" />
      </div>
    </form>
  );
};
