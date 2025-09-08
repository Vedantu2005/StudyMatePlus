import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Check for token to determine initial auth state
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const navigate = useNavigate();

    // This effect will listen for changes to the auth state (e.g., after login/logout)
    // A more robust solution might use React Context to manage this globally
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };
        // This is a custom event you might dispatch after login/logout
        // to ensure all components update.
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChange', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChange', handleStorageChange);
        };
    }, []);


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        closeMobileMenu();
        // Dispatch a custom event to notify other components if needed
        window.dispatchEvent(new Event('authChange'));
        navigate('/login'); // Redirect to login page after logout
    };

    // Placeholder avatar, you can fetch the real one later
    const userAvatar = "https://avatar.iran.liara.run/public/boy";

    const authLinks = (
        <>
            <Link to="/profile" className="navbar-profile-link" onClick={closeMobileMenu}>
                <img
                    src={userAvatar}
                    alt="User Profile"
                    className="navbar-profile-img"
                />
            </Link>
            <button onClick={handleLogout} className="navbar-logout-button">Logout</button>
        </>
    );

    const mobileAuthLinks = (
        <>
            <li><NavLink to="/profile" className="navbar-link-mobile" onClick={closeMobileMenu}>Profile</NavLink></li>
            <li><button className="navbar-link-mobile-button" onClick={handleLogout}>Logout</button></li>
        </>
    );

    const mobileGuestLinks = (
        <>
            <li><NavLink to="/login" className="navbar-link-mobile" onClick={closeMobileMenu}>Login</NavLink></li>
            <li><NavLink to="/signup" className="navbar-link-mobile" onClick={closeMobileMenu}>Sign Up</NavLink></li>
        </>
    );


    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <img
                        src="/logo.png"
                        alt="StudyMatePlus Logo"
                        className="navbar-logo"
                    />
                </Link>

                <div className="navbar-right">
                    <ul className="navbar-links">
                        {/* UPDATED: Added 'end' prop to the Home NavLink */}
                        <li><NavLink to="/" className="navbar-link" end>Home</NavLink></li>
                        <li><NavLink to="/about" className="navbar-link">About Us</NavLink></li>
                        <li><NavLink to="/syllabus" className="navbar-link">Syllabus</NavLink></li>
                        <li><NavLink to="/notes" className="navbar-link">Notes</NavLink></li>
                        <li><NavLink to="/pyqs" className="navbar-link">PYQs</NavLink></li>
                        <li><NavLink to="/analytics" className="navbar-link">Analytics</NavLink></li>
                        <li><NavLink to="/mindmap" className="navbar-link">Mind Map</NavLink></li>
                        <li><NavLink to="/feedback" className="navbar-link">Feedback</NavLink></li>
                        <li><NavLink to="/faq" className="navbar-link">FAQs</NavLink></li>
                        
                        {!isAuthenticated && (
                            <>
                                <li><NavLink to="/login" className="navbar-link">Login</NavLink></li>
                                <li><NavLink to="/signup" className="navbar-link">Sign Up</NavLink></li>
                            </>
                        )}
                    </ul>

                    {isAuthenticated && (
                        <div className="navbar-auth-section">
                            {authLinks}
                        </div>
                    )}

                    <button className="navbar-toggle" onClick={toggleMobileMenu}>
                        ☰
                    </button>
                </div>
            </div>

            <div className={`navbar-menu-mobile ${isMobileMenuOpen ? "active" : ""}`}>
                <ul className="navbar-links-mobile">
                    {/* UPDATED: Added 'end' prop to the mobile Home NavLink */}
                    <li><NavLink to="/" className="navbar-link-mobile" onClick={closeMobileMenu} end>Home</NavLink></li>
                    <li><NavLink to="/about" className="navbar-link-mobile" onClick={closeMobileMenu}>About Us</NavLink></li>
                    <li><NavLink to="/syllabus" className="navbar-link-mobile" onClick={closeMobileMenu}>Syllabus</NavLink></li>
                    <li><NavLink to="/notes" className="navbar-link-mobile" onClick={closeMobileMenu}>Notes</NavLink></li>
                    <li><NavLink to="/pyqs" className="navbar-link-mobile" onClick={closeMobileMenu}>PYQs</NavLink></li>
                    <li><NavLink to="/analytics" className="navbar-link-mobile" onClick={closeMobileMenu}>Analytics</NavLink></li>
                    <li><NavLink to="/mindmap" className="navbar-link-mobile" onClick={closeMobileMenu}>Mind Map</NavLink></li>
                    <li><NavLink to="/feedback" className="navbar-link-mobile" onClick={closeMobileMenu}>Feedback</NavLink></li>
                    <li><NavLink to="/faq" className="navbar-link-mobile" onClick={closeMobileMenu}>FAQs</NavLink></li>
                    <hr className="navbar-mobile-divider" />
                    {isAuthenticated ? mobileAuthLinks : mobileGuestLinks}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

