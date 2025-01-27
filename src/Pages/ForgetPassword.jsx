import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi"
import { getPasswordResetToken } from '../Services/Operations/authApi'

const ForgotPassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
        <div style={{ display: 'grid', minHeight: 'calc(100vh - 3.5rem)', placeItems: 'center' }}>
            {loading ? (
                <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '5px solid #f3f3f3', borderTop: '5px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            ) : (
                <div style={{ maxWidth: '500px', padding: '1rem 2rem' }}>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '600', lineHeight: '2.375rem', color: '#D1D5DB' }}>
                        {!emailSent ? "Reset your password" : "Check email"}
                    </h1>
                    <p style={{ margin: '1rem 0', fontSize: '1.125rem', lineHeight: '1.625rem', color: '#4B5563' }}>
                        {!emailSent
                            ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                            : `We have sent the reset email to ${email}`}
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        {!emailSent && (
                            <label style={{ width: '100%' }}>
                                <p style={{ marginBottom: '0.25rem', fontSize: '0.875rem', lineHeight: '1.375rem', color: '#D1D5DB' }}>
                                    Email Address <sup style={{ color: '#F472B6' }}>*</sup>
                                </p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email address"
                                    style={{
                                        width: '100%',
                                        borderRadius: '0.5rem',
                                        backgroundColor: '#1F2937',
                                        padding: '12px 0 12px 6px',
                                        color: '#D1D5DB',
                                        boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
                                    }}
                                />
                            </label>
                        )}
                        <button
                            type="submit"
                            style={{
                                marginTop: '1.5rem',
                                width: '100%',
                                borderRadius: '8px',
                                backgroundColor: '#facc15',
                                color: '#121212',
                                padding: '12px',
                                fontWeight: '500',
                                fontSize: '1rem'
                            }}
                        >
                            {!emailSent ? "Submit" : "Resend Email"}
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

export default ForgotPassword
