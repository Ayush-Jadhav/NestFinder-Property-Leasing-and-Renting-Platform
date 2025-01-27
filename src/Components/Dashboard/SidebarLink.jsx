import React from 'react';
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <>
    {link.path ?
    (<NavLink
      to={link.path}
      // TODO: Reason behind this
      // onClick={() => dispatch(resetCourseState())} 
      style={{
        position: "relative",
        padding: "8px 16px",
        fontSize: "14px",
        fontWeight: "500",
        textDecoration: "none",
        color: matchRoute(link.path) ? "#FFFFE0" : "#A9A9A9",
        backgroundColor: matchRoute(link.path) ? "rgba(87, 85, 85, 0.4)" : "transparent",
        display: "block",
        transition: "all 0.2s",
      }}
    >
      {/* Yellow bar */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "3px",
          backgroundColor: "#FFFFE0",
          opacity: matchRoute(link.path) ? "1" : "0",
          transition: "opacity 0.2s",
        }}
      ></span>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Icon Goes Here */}
        <Icon style={{ fontSize: "18px" }} />
        <span>{link.name}</span>
      </div>
    </NavLink>) : 
      (
      <>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" ,position: "relative",
        padding: "8px 16px",
        fontSize: "14px",
        fontWeight: "600",
        textDecoration: "none",
        color:  "rgba(18, 17, 17, 0.75)",
        backgroundColor:  "#FFD700",
        // display: "block",
        transition: "all 0.2s",}}>
        <Icon style={{ fontSize: "18px", fontWeight:"700"}} />
        <span>{link.name}</span>
      </div>
      </>)
      }
    </>
  );
};

export default SidebarLink;
