import React, { useState, useEffect } from 'react';

// The CSS styles are embedded directly within the component for simplicity.
const styles = `
    .auth-body {
        background: #FFFFFF; /* White background */
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        box-sizing: border-box;
        font-family: 'Segoe UI', sans-serif;
    }

    .split-container {
        display: flex;
        width: 900px;
        max-width: 90%;
        border-radius: 12px;
        box-shadow: 0 8px 150px rgba(0, 0, 0, 0.1); /* Softer shadow for white background */
        overflow: hidden;
        background: white;
    }

    .left-panel {
        flex: 1;
        position: relative;
        background-image: url('https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        background-size: cover;
        background-position: center;
        color: white;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-right: 1px solid #eee;
    }
       
    .left-panel::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
    }

    .left-panel > * {
        z-index: 1;
    }

    .left-panel .quote-header {
        font-size: 0.9rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .left-panel h1 {
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 0.5rem;
    }

    .left-panel p {
        font-size: 0.9rem;
        max-width: 90%;
        line-height: 1.5;
    }

    .right-panel {
        flex: 1;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .brand-logo {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
        color: #333;
        font-weight: 600;
        margin-bottom: 1.5rem;
    }

    .signup-form-header {
        text-align: left;
        margin-bottom: 1.5rem;
    }

    .signup-form-header h2 {
        font-size: 2rem;
        margin-bottom: 0.25rem;
    }

    .signup-form-header p {
        font-size: 0.9rem;
        color: #666;
    }

    .form-group {
        margin-bottom: 1rem;
        position: relative;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-size: 0.9rem;
    }

    input[type="email"],
    input[type="password"],
    input[type="text"] {
        width: 100%;
        padding: 10px;
        padding-right: 40px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 0.9rem;
        outline: none;
        box-sizing: border-box;
    }

    input:focus {
        border-color: #3d55b4;
        box-shadow: 0 0 5px rgba(61, 85, 180, 0.4);
    }

    .toggle-password {
        position: absolute;
        right: 10px;
        top: 38px;
        cursor: pointer;
        color: #555;
        font-size: 1rem;
    }

    .inline-feedback {
        font-size: 0.8rem;
        color: red;
        margin-top: 5px;
        min-height: 1.2em; /* Reserve space to prevent layout shifts */
    }

    .btn {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 6px;
        background-color: #3d55b4;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn:disabled {
        background-color: #999;
        cursor: not-allowed;
    }

    .spinner {
        display: none;
        width: 24px;
        height: 24px;
        margin: 1rem auto 0;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3d55b4;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .form-switch {
        text-align: center;
        margin-top: 1rem;
        font-size: 0.9rem;
    }

    .form-switch a {
        color: #3d55b4;
        text-decoration: none;
        cursor: pointer;
        font-weight: 600;
    }
`;

const LeftPanel = () => (
    <div className="left-panel">
        <div>
            <p className="quote-header">A WISE QUOTE</p>
        </div>
        <div>
            <h1>Get Everything You Want</h1>
            <p>You can get everything you want if you work hard, trust the process, and stick to the plan.</p>
        </div>
    </div>
);

const RightPanel = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const validate = (name, value) => {
        switch (name) {
            case 'name':
                if (!value) return 'Name is required';
                break;
            case 'email':
                if (!value) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
                break;
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 6) return 'Password must be at least 6 characters';
                break;
            case 'confirmPassword':
                if (!value) return 'Please confirm your password';
                if (value !== formData.password) return 'Passwords do not match';
                break;
            default:
                break;
        }
        return '';
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        const error = validate(id, value);
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validate(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);
        // Simulate form submission
        setTimeout(() => {
            setLoading(false);
            // In a real app, you would not use alert. This is for demonstration.
            console.log("Account created successfully!");
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        }, 1500);
    };

    return (
        <div className="right-panel">
            <div className="brand-logo">
                <span>Job-Portal</span>
            </div>
            <div className="signup-form-header">
                <h2>Create Account</h2>
                <p>Get started by creating your account!</p>
            </div>
            <form id="signup-form" onSubmit={handleFormSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                    <div className="inline-feedback">{errors.name}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                    <div className="inline-feedback">{errors.email}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
                    <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>👁️</span>
                    <div className="inline-feedback">{errors.password}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                    <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>👁️</span>
                    <div className="inline-feedback">{errors.confirmPassword}</div>
                </div>
                <button type="submit" className="btn" disabled={loading}>Sign Up</button>
                <div className="spinner" style={{ display: loading ? 'block' : 'none' }}></div>
                <div className="form-switch">
                    <p>Already have an account? <a href="#">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default function Signup() {
    return (
        <>
            <style>{styles}</style>
            <div className="auth-body">
                <div className="split-container">
                    <LeftPanel />
                    <RightPanel />
                </div>
            </div>
        </>
    );
}
