import React from "react"
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> 6fd99c18e3c35c8f2f50c57cba1d9fe9bf6a496f

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
<<<<<<< HEAD
                    <Link to = "/auth" className = "auth-link"><button className="get-started-button">Get started</button></Link>
=======
                    <button className="get-started-button">Get started</button>
>>>>>>> 6fd99c18e3c35c8f2f50c57cba1d9fe9bf6a496f
                </div>
            </div>
        </header>
    )
};