import "./base.css";
import React from "react";
import { Link } from "react-router-dom";
import CrowdAcademyLogo from "../../assets/icon_tr.png";


const Topbar = () => {
    return (
        <div className="topbar">
            <Link to="/" className="topbar-link">
                <img src={CrowdAcademyLogo} alt="CrowdAcademy Logo" className="logo-image" />
                <h4 className="Logo-text">CrowdAcademy</h4>
            </Link>
        </div>
    )
}


export default Topbar;