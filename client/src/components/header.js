import React from "react"
import { Link } from 'react-router-dom';

import CrowdAcademyLogo from '../assets/icon_tr.png'


export default function Header() {
    return (
        <header>
            <div className="header-top-container">
                <div className="logo">
                    <img src={CrowdAcademyLogo} alt="rafini" />
                    <h3 className="logo-text">CrowdAcademy</h3>
                </div>
                <div>
                    <button className="instructor-button">Instructor</button>
                    <Link to = "/auth" className = "auth-link"><button className="get-started-button">Get started</button></Link>
                </div>
            </div>
        </header>
    )
};