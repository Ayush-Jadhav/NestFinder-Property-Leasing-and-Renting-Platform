import React from 'react'
import { Outlet } from 'react-router-dom'
import { PropertySideBar } from '../../Components/RegisterPropertyPages/PropertySideBar'
import sideImage from '../../assets/formBackground1.jpg'

export const Register = () => {
  // if (loading) {
  //   return (
  //     <div
  //     style={{
  //       display: "grid",
  //       minHeight: "calc(100vh - 3.5rem)",
  //       placeItems: "center",
  //     }}
  //     >
  //         <div className="spinner"></div>
  //       </div>
  //     );
  //   }
    
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        minHeight: "calc(100vh - 3.5rem)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1, // Places the background below the content
          backgroundImage: `linear-gradient(to left, rgba(235, 233, 233, 0.2) 5%, rgba(0, 0, 0, 10) 80%), url(${sideImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // opacity:0.2,
          
        }}
      ></div>
      <PropertySideBar />
  
      <div
        style={{
          height: "calc(100vh - 3.5rem)",
          flex: 1,
          overflow: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            width: "80%", // equivalent to w-11/12
            maxWidth: "900px",
            paddingTop: "10px",
            paddingBottom: "10px",
            position: "relative",
            zIndex: 2, // Ensures this content stays above the background
          }}
        >
          <Outlet />
        </div>
  
        {/* Background Image with Gradient */}

      </div>
    </div>
  );
}
