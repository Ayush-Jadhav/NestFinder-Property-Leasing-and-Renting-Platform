import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../pageStyle/EditProfile.css";
import { profileUpdate } from "../../../Services/Operations/profileApi";
import IconBtn from "../../IconBtn";
import { useEffect } from "react";

export default function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      dispatch(profileUpdate(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="edit-profile-form-section">
          <h2 className="edit-profile-form-section-title">Profile Information</h2>
          <div className="edit-profile-form-row">
            <div className="edit-profile-form-group">
              <label htmlFor="firstName" className="edit-profile-form-label">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="edit-profile-form-input"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="edit-profile-error-message">
                  Please enter your first name.
                </span>
              )}
            </div>

            <div className="edit-profile-form-group">
              <label htmlFor="lastName" className="edit-profile-form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="edit-profile-form-input"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.email && (
                <span className="edit-profile-error-message">
                  Please enter your last name.
                </span>
              )}
            </div>

            <div className="edit-profile-form-group">
              <label htmlFor="email" className="edit-profile-form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                className="edit-profile-form-input"
                {...register("email", { required: true })}
                defaultValue={user?.email}
              />
              {errors.lastName && (
                <span className="edit-profile-error-message">
                  Please enter your Email
                </span>
              )}
            </div>
          </div>

          <div className="edit-profile-form-row">
            <div className="edit-profile-form-group">
              <label htmlFor="contactNumber" className="edit-profile-form-label">
                Contact Number
              </label>
              <input
                type="tel"
                name="number"
                id="number"
                placeholder="Enter Contact Number"
                className="edit-profile-form-input"
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
                <span className="edit-profile-error-message">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="edit-profile-form-actions">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="edit-profile-btn-secondary"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  );
}
