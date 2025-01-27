import React from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../IconBtn';
import "./Register page Style/propertyAddress.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setProp, stepNum } from '../../Redux/Slices/propSlice';

export const PropertyAddress = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {prop} = useSelector((state)=>state.prop);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const submitProfileForm = async (data) => {
      dispatch(setProp(data));
      dispatch(stepNum(3));
      navigate('/Register/PostProperty/AdditionalInfo')
    };
  
    return (
      <>
        <form onSubmit={handleSubmit(submitProfileForm)}>
          {/* Profile Information */}
          <div className="form-section">
            <h2 className="form-section-title">Where is your Property located?</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  name="State"
                  id="State"
                  placeholder="State"
                  className="form-input"
                  {...register("state", { required: true })}
                  defaultValue={prop?.state}
                />
                {errors.state && (
                  <span className="error-message">
                    Please enter State.
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  className="form-input"
                  {...register("city", { required: true })}
                  defaultValue={prop?.city}
                />
                {errors.city && (
                  <span className="error-message">
                    Please enter City.
                  </span>
                )}
              </div>
  
              <div className="form-group">
                <label htmlFor="locality" className="form-label">
                  Locality
                </label>
                <input
                  type="text"
                  name="locality"
                  id="locality"
                  placeholder="Locality"
                  className="form-input"
                  {...register("locality", { required: true })}
                  defaultValue={prop?.locality}
                />
                {errors.locality && (
                  <span className="error-message">
                    Please enter Locality.
                  </span>
                )}
              </div>
  
            <div className="form-group">
                <label htmlFor="street" className="form-label">
                  Sub-locality/Street
                </label>
                <input
                  type="street"
                  name="street"
                  id="street"
                  placeholder="Sub-Locality"
                  className="form-input"
                  {...register("street",{ required: true })}
                  defaultValue={prop?.street}
                />
                {errors.street && (
                  <span className="error-message">
                    Please enter Locality.
                  </span>
                )}
              </div>
            </div>


  
  
            {/* <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactNumber" className="form-label">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="number"
                  id="number"
                  placeholder="Enter Contact Number"
                  className="form-input"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Please enter your Contact Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Contact Number" },
                    minLength: { value: 10, message: "Invalid Contact Number" },
                  })}
                  defaultValue={user?.number}
                />
                {errors.contactNumber && (
                  <span className="error-message">
                    {errors.contactNumber.message}
                  </span>
                )}
              </div> */}
  
            </div>
          {/* </div> */}
  
          <div className="form-actions">
            <IconBtn type="submit" text="Post and Continue" />
          </div>
        </form>
      </>
  );
}
