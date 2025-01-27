import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../IconBtn";
import "../pageStyle/UpdatePassword.css";
import { changePassword } from "../../../Services/Operations/profileApi";
import toast from "react-hot-toast";
export default function UpdatePassword() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      if(data.oldPassword===data.newPassword)
      {
        toast.error("New Password must be different");
      }
      else{
        dispatch(changePassword(token, data));
      }
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)} className="password-form">
        <div className="password-container">
          <h2 className="password-heading">Password</h2>
          <div className="password-fields">
            <div className="password-field">
              <label htmlFor="oldPassword" className="label-style">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="input-style"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="toggle-visibility"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#ccc" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#ccc" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="error-text">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="password-field">
              <label htmlFor="newPassword" className="label-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="input-style"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="toggle-visibility"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#ccc" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#ccc" />
                )}
              </span>
              {errors.newPassword && (
                <span className="error-text">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="password-actions">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  );
}
