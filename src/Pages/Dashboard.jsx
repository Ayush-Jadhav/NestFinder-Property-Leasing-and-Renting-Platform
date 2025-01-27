import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div
        style={{
          display: "grid",
          minHeight: "calc(100vh - 3.5rem)",
          placeItems: "center",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        minHeight: "calc(100vh - 3.5rem)",
      }}
    >
      <Sidebar />
      <div
        style={{
          height: "calc(100vh - 3.5rem)",
          flex: 1,
          overflow: "auto",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            width: "91.6667%", // equivalent to w-11/12
            maxWidth: "1000px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
