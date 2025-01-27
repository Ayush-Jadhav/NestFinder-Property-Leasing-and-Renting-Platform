import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../Services/Operations/authApi';
import { Link} from "react-router-dom"
const UpdatePassword = () => {
    
    const {loading} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })

    const {password,confirmPassword} = formData;
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleOnChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token,navigate))
    }
  return (
    <div style={{ display: 'grid', minHeight: 'calc(100vh - 3.5rem)', placeItems: 'center' }}>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div style={{ maxWidth: '500px', padding: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '600', lineHeight: '2.375rem', color: '#E5E7EB' }}>
            Choose new password
          </h1>
          <p style={{ margin: '1rem 0', fontSize: '1.125rem', lineHeight: '1.625rem', color: '#9CA3AF' }}>
            Almost done. Enter your new password and you're all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            <label style={{ position: 'relative', display: 'block' }}>
              <p style={{ marginBottom: '0.25rem', fontSize: '0.875rem', lineHeight: '1.375rem', color: '#E5E7EB' }}>
                New Password <sup style={{ color: '#F9A8D4' }}>*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                style={{
                  width: '100%',
                  borderRadius: '0.5rem',
                  backgroundColor: '#1F2937',
                  padding: '12px',
                  color: '#E5E7EB',
                  boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)'
                }}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ position: 'absolute', right: '12px', top: '38px', zIndex: '10', cursor: 'pointer' }}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label style={{ position: 'relative', display: 'block', marginTop: '1rem' }}>
              <p style={{ marginBottom: '0.25rem', fontSize: '0.875rem', lineHeight: '1.375rem', color: '#E5E7EB' }}>
                Confirm New Password <sup style={{ color: '#F9A8D4' }}>*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                style={{
                  width: '100%',
                  borderRadius: '0.5rem',
                  backgroundColor: '#1F2937',
                  padding: '12px',
                  color: '#E5E7EB',
                  boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)'
                }}
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                style={{ position: 'absolute', right: '12px', top: '38px', zIndex: '10', cursor: 'pointer' }}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button
              type="submit"
              style={{
                marginTop: '1.5rem',
                width: '100%',
                borderRadius: '8px',
                backgroundColor: '#facc15',
                fontSize: '1rem',
                color: '#121212',
                padding: '12px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reset Password
            </button>
          </form>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/SignUp" style={{ textDecoration: 'none' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D1D5DB' }}>
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword;
