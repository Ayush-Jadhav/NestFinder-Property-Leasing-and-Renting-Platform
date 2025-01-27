import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
import './Register page Style/sideBarStep.css'; // Import CSS styles

export const SideBarStep = ({ step }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { stepNum } = useSelector((state) => state.prop);

    const isCurrent = step.pathname === location.pathname;
    return (
        <div className={`sidebar-step ${isCurrent ? 'current' : ''}`}>
            <div className="step-icon">
                {stepNum > step.id ? (
                    <>
                    {step.id !== 1 && <span className="CompletionLineUp"></span>}
                    <IoIosCheckmarkCircle className="icon completed" />
                    {step.id !== 4 && <span className="CompletionLineDown"></span>}
                    </>
                ) : isCurrent ? (
                    <>
                    {step.id !== 1 && <span className="CompletionLineUp"></span>}
                    <MdRadioButtonChecked className="icon current" />
                    {step.id !== 4 && <span className="CompletionLineDown"></span>}
                    </>
                ) : (
                    <>
                    {step.id !== 1 && <span className="UncompletionLineUp"></span>}
                    <MdRadioButtonUnchecked className="icon" />
                    {step.id !== 4 && <span className="UncompletionLineDown"></span>}
                    </>
                )}
            </div>

            {/* Step Details */}
            <div className="step-details">
                <h4>{step.name}</h4>
                <p>
                    Step {step.id}
                    {stepNum > step.id && (
                        <span
                            className="edit-link"
                            onClick={() => navigate(step.pathname)}
                        >
                            Edit
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
};
