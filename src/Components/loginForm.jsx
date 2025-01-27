import React from 'react';
import { useState } from 'react';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { logIn } from '../Services/Operations/authApi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [visiblePass,setVisiblePass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    // number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    dispatch(logIn(formData,navigate))

  };

  return (
    <form className="signUpForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        {/* <div className="formGroup">
          <label>Phone Number</label>
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div> */}
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
          <Link to="/forgot-password">
            <span className='forgotPass'>
            Forgot Password
            </span>
          </Link>
        </div>
        <button type="submit" className="signUpButton">
          Login
        </button>
      </form>
  )
}
