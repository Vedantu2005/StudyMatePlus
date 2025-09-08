import React, { useState } from 'react';

// The CSS styles are now embedded directly within the component.
const styles = `
    .auth-body {
        background: #FFFFFF;
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
        box-shadow: 0 8px 150px rgba(255, 255, 255, 0.247);
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
        border-right: 1px solid #ccc;
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

    .login-form-header {
        text-align: left;
        margin-bottom: 1.5rem;
    }

    .login-form-header h2 {
        font-size: 2rem;
        margin-bottom: 0.25rem;
    }

    .login-form-header p {
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
    input[type="password"] {
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
    }

    .checkbox-group {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }

    .forgot-password {
        display: block;
        text-align: right;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #3d55b4;
        text-decoration: none;
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

    .divider {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 20px 0;
    }

    .divider::before,
    .divider::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #ccc;
    }

    .divider:not(:empty)::before {
        margin-right: 10px;
    }

    .divider:not(:empty)::after {
        margin-left: 10px;
    }

    .divider span {
        color: #888;
        font-size: 14px;
        white-space: nowrap;
    }

    .google-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: white;
        color: #5f6368;
        border: 1px solid #dadce0;
        border-radius: 8px;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        transition: background-color 0.3s ease;
        justify-content: center;
        width: 100%;
    }

    .google-btn:hover {
        background-color: #f7f8f8;
    }

    .google-icon {
        width: 20px;
        height: 20px;
    }

    .link-footer {
        text-align: center;
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #666;
    }

    .link-footer a {
        color: #3d55b4;
        text-decoration: none;
        font-weight: 600;
    }
`;

// The Google Icon component is now defined within the same file.
const GoogleIcon = () => (
    <span className="google-logo">
        <svg className="google-icon" viewBox="0 0 533.5 544.3">
            <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.6-37.1-5-55.2H272v104.5h146.9c-6.4 34.7-25.7 64.1-54.9 83.5l89 69.4c52-47.8 80.5-118.3 80.5-202.2z"/>
            <path fill="#34A853" d="M272 544.3c73.6 0 135.4-24.3 180.5-65.9l-89-69.4c-24.7 16.6-56.4 26.2-91.5 26.2-70.4 0-130-47.6-151.3-111.5l-93.6 72.3c43.3 85.1 132.1 147.3 244.9 147.3z"/>
            <path fill="#FBBC04" d="M120.7 323.7c-10.4-30.7-10.4-63.6 0-94.3L27 157c-40.7 79.7-40.7 172 0 251.7l93.7-72.3z"/>
            <path fill="#EA4335" d="M272 107.7c38.6-.6 75.5 13.6 104 39.4l77.7-77.7C403.2 23.9 340.2-.2 272 0 159.2 0 70.5 62.2 27.2 147.3l93.6 72.4c21.4-63.9 81-111.5 151.2-112z"/>
        </svg>
    </span>
);

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(newEmail)) {
            setEmailError("Enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword.length > 0 && newPassword.length < 5) {
            setPasswordError("Password must be at least 5 characters");
        } else {
            setPasswordError("");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let hasError = false;

        if (!email) {
            setEmailError("Email is required");
            hasError = true;
        }

        if (password.length < 5) {
            setPasswordError("Password must be at least 5 characters");
            hasError = true;
        }

        if (hasError || emailError) {
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // In a real app, you would use a proper notification system instead of alert().
            console.log("Login successful!"); 
        }, 1500);
    };

    return (
        <div className="right-panel">
            <div className="brand-logo">
                <span>Job-Portal</span>
            </div>
            <div className="login-form-header">
                <h2>Welcome Back</h2>
                <p>Enter your email and password to access your account!</p>
            </div>
            <form id="login-form" onSubmit={handleFormSubmit} noValidate>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        id="login-email" 
                        value={email}
                        onChange={handleEmailChange}
                        required 
                    />
                    {emailError && <div className="inline-feedback">{emailError}</div>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type={showPassword ? "text" : "password"}
                        id="login-password" 
                        value={password}
                        onChange={handlePasswordChange}
                        minLength="5" 
                        required 
                    />
                    <span className="toggle-password" onClick={togglePasswordVisibility}>👁️</span>
                    {passwordError && <div className="inline-feedback">{passwordError}</div>}
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </div>
                <a href="#" className="forgot-password">Forgot Password?</a>
                <button type="submit" className="btn" disabled={loading}>
                    Sign In
                </button>
                {loading && <div className="spinner" id="login-spinner" style={{ display: 'block' }}></div>}
                <div className="divider">
                    <span>or continue with</span>
                </div>
                <button id="google-login-btn" className="google-btn" type="button">
                    <GoogleIcon />
                    <span>Sign in with Google</span>
                </button>
                <div className="link-footer">
                    <p>Don't have an account? <a href="#">Sign up</a></p>
                </div>
            </form>
        </div>
    );
};

export default function App() {
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



