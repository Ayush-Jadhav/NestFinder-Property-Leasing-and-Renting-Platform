import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import IconBtn from '../IconBtn';
import "./Register page Style/propertyAdditionalInfo.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setProp, stepNum } from '../../Redux/Slices/propSlice';

export const PropertyAdditionalInfo = () => {
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

  const [selectedFurnishing, setSelectedFurnishing] = useState(prop?.furnishing || "");
  const [furnishingError,setFurnishingError] = useState(false);
  const [selectedwillingToGive, setSelectedwillingToGive] = useState(prop?.willingToGive || "");
  const [willingToGiveError,setwillingToGiveError] = useState(false);

  
  const submitProfileForm = (data) => {
    if(selectedFurnishing==="")
    {
      setFurnishingError(true);
    }
    
    if(selectedwillingToGive==="")
    {
      setwillingToGiveError(true);
    }
    
    if(selectedFurnishing!=="" && selectedwillingToGive!=="")
    {
      setFurnishingError(false);
      setwillingToGiveError(false);
      data.furnishing = selectedFurnishing;
      data.willingToGive = selectedwillingToGive;
      dispatch(setProp(data));
      dispatch(stepNum(4));
      navigate('/Register/PostProperty/Media')
    }


    // Handle form submission logic here
  };

  return (
    <>
            <form onSubmit={handleSubmit(submitProfileForm)}>
            <div className="form-section">
              <h2 className="form-section-title">Tell us about your property</h2>
              <div className="form-row">

              {/* Profile Information */}
              <div className="form-group">
                <label className="form-label">Willing To Give</label>
                <div className="button-container">
                  {["Single-men","Single-women","Family"].map((willingToGive) => (
                    <button
                      key={willingToGive}
                      type="button"
                      className={`choice-button ${
                        selectedwillingToGive.includes(willingToGive) ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedwillingToGive(willingToGive);
                        setwillingToGiveError(false)
                      }}
                    >
                      {willingToGive}
                    </button>
                  ))}
                </div>
                {willingToGiveError && (
                  <span className="error-message">Please select field.</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Furnishing Status</label>
                <div className="button-container">
                  {["Furnished","Semi-furnished","Un-furnished"].map((furnishing) => (
                    <button
                      key={furnishing}
                      type="button"
                      className={`choice-button ${
                        selectedFurnishing.includes(furnishing) ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedFurnishing(furnishing);
                        setFurnishingError(false)
                      }}
                    >
                      {furnishing}
                    </button>
                  ))}
                </div>
                {furnishingError && (
                  <span className="error-message">Please select a furnishing status.</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="plotArea" className="form-label">
                  Plot Area
                </label>
                <input
                  type="text"
                  name="plotArea"
                  id="plotArea"
                  placeholder="plotArea (in sq.ft.)"
                  className="form-input"
                  {...register("plotArea", { required: true })}
                  defaultValue={prop?.plotArea}
                />
                {errors.plotArea && (
                  <span className="error-message">
                    Please enter plotArea.
                  </span>
                )}
              </div>


                </div>
              </div>
      
              <div className="form-actions">
                <IconBtn type="submit" text="Post and Continue" />
              </div>
            </form>
          </>
  )
}
