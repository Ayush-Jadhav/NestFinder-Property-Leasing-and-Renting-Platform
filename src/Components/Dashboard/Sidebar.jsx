import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import SidebarLink from "./SidebarLink";
import { logOut } from "../../Services/Operations/authApi";
import ConfirmationModal from "../ConfirmationModal";

const Sidebar = () => {
  const sidebarLinks = [
    { id: 1, name: "Dashboard", icon: "VscDashboard" },
    { id: 2, name: "My Properties", path: "/dashboard/my-Properties", icon: "VscVm" },
    { id: 3, name: "Add New Property", path: "/Register/PostProperty/Basics", icon: "VscAdd" },
    { id: 4, name: "My Profile", path: "/dashboard/my-profile", icon: "VscAccount" },
  ];

//   const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (authLoading) {
    return (
      <div
        style={{
          display: "grid",
          height: "80vh",
          minWidth: "220px",
          alignItems: "center",
          borderRight: "1px solid #4A4A4A",
          backgroundColor: "#1A1A1A",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 3.5rem)",
          minWidth: "220px",
          borderRight: "1px solid #4A4A4A",
          backgroundColor: "#1A1A1A",
          padding: "10px 0",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          ))}
        </div>

        <div
          style={{
            margin: "20px auto",
            height: "1px",
            width: "80%",
            backgroundColor: "#4A4A4A",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logOut(navigate)),
                btn2Handler: () => setConfirmationModal(null),
            })}
            style={{
              padding: "10px",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#AAAAAA",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <VscSignOut style={{ fontSize: "18px" }} />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
