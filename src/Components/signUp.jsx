import React from 'react'
import { useState } from 'react';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { setSignupData } from '../Redux/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../Services/Operations/authApi';


export const SignUpForm = () => {
    const [visiblePass,setVisiblePass] = useState(false);
    const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      password: "",
      confirmPassword: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data Submitted:", formData);
      dispatch(setSignupData(formData));
      dispatch(sendOTP(formData.email,formData.number,navigate));
      // setFormData({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   number: "",
      //   password: "",
      //   confirmPassword: "",
      // })
    };


  return (
    <form className="signUpForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="formGroup">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="formGroup">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="formGroup">
          <label>Phone Number</label>
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="formGroup">
          <label>Password</label>
          <div className="passInput">
            <input
              type={visiblePass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span className='visibleIcon' onClick={()=>setVisiblePass(!visiblePass)}>{visiblePass? <BiSolidHide /> : <BiSolidShow />}</span>
          </div>
        </div>
        <div className="formGroup">
          <label>Confirm Password</label>
          <div className="passInput">
            <input
              type={visibleConfirmPass ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            <span className='visibleIcon' onClick={()=>setVisibleConfirmPass(!visibleConfirmPass)}>{visibleConfirmPass? <BiSolidHide /> : <BiSolidShow />}</span>
          </div>
        </div>
        <button type="submit" className="signUpButton">
          Sign Up
        </button>
      </form>
  )
}
