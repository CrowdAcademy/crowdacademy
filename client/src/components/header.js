import React from "react"

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
                    <button className="get-started-button">Get started</button>
                </div>
            </div>
        </header>
    )
};