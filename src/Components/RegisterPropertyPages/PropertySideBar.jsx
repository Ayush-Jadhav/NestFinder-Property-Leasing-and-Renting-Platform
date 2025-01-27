import React from 'react';
import { SideBarStep } from './sideBarStep';
import './Register page Style/PropertySideBar.css'; // Import CSS styles

export const PropertySideBar = () => {
    const sidebarSteps = [
        { id: 1, name: "Basic Details", pathname: '/Register/PostProperty/Basics' },
        { id: 2, name: "Location Details", pathname: "/Register/PostProperty/Address" },
        { id: 3, name: "Property Profile", pathname: "/Register/PostProperty/AdditionalInfo" },
        { id: 4, name: "Photos, Videos", pathname: "/Register/PostProperty/Media" },
    ];

    return (
        <div className="sidebar-container">
            {sidebarSteps.map((step) => (
                <SideBarStep key={step.id} step={step} />
            ))}
        </div>
    );
};
