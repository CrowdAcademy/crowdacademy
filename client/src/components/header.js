import React from "react";
import { Link } from 'react-router-dom';
import { useUser } from "../context/UserContext";

import CrowdAcademyLogo from '../assets/icon_tr.png';
// import './Header.css';

const Header = () => {
    const { user, loading } = useUser();

    return (
        <header className="header-container">
            <div className="header-top-container">
                <div className="logo">
                    <img src={CrowdAcademyLogo} alt="CrowdAcademy Logo" className="logo-image" />
                    <h3 className="logo-text">CrowdAcademy</h3>
                </div>
                <div className="header-buttons">
                    <Link to="/instructor/home" className="auth-link">
                        <button className="instructor-button">Instructor</button>
                    </Link>
                    <Link to="/auth" className="auth-link">
                        <button className="get-started-button">Get Started</button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
