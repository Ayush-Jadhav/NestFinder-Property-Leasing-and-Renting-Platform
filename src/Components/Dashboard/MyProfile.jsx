import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
// import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../IconBtn";
import './pageStyle/MyProfile.css';

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <h1 className="profile-header">My Profile</h1>

      <div className="profile-container">
        <div className="profile-image-container">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="profile-image"
          />
          <div className="profile-details">
            <p className="profile-name">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
        <div className="edit-button-container">
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>


      <div className="personal-details-container">
        <div className="details-row">
          <div className="details-column">
            <div>
              <p className="details-item-label">First Name</p>
              <p className="details-item">{user?.firstName}</p>
            </div>
            <div>
              <p className="details-item-label">Email</p>
              <p className="details-item">{user?.email}</p>
            </div>
          </div>

          <div className="details-column">
            <div>
              <p className="details-item-label">Last Name</p>
              <p className="details-item">{user?.lastName}</p>
            </div>
            <div>
              <p className="details-item-label">Phone Number</p>
              <p className="details-item">
                {user?.number ?? "Add Contact Number"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
