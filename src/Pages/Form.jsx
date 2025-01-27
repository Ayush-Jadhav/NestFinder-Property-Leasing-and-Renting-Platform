import React, { useState } from "react";
import formBackground from "../assets/formBackground1.jpg";
import "./pageStyle/SignUp.css"; // Add your custom styles here
import {SignUpForm} from "../Components/signUp";
import {LoginForm} from "../Components/loginForm";

const Form = () => {
  const [form,setForm] = useState("login");


  return (
    <div className="form">
      <img src={formBackground} alt="" />
      <div className="signUpContainer">
        <div className="chooseForm">
          <span className={form==="signup" ? "activeForm" : "formOption"} onClick={()=>{setForm("signup")}}>SignUP</span>
          <span className={form==="login" ? "activeForm" : "formOption"} onClick={()=>{setForm("login")}}>LogIn</span>
        </div >
        {
          form==="signup" && <SignUpForm/>
        }
        {
          form==="login" && <LoginForm/>
        }
      </div>
    </div>

  );
};

export default Form;
