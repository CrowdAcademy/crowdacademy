import './base.css';
import React from 'react';
import { Link } from 'react-router-dom';
import CrowdAcademyLogo from '../../assets/icon_tr.png';
import { useUser } from '../../context/UserContext';
import { formatString, truncateString } from '../../utils/string';

function SideBar() {
    const { user, loading } = useUser();

    return (
        <aside className="home-aside-container">
            <Link to="/">
                <img className="Logo-design" src={CrowdAcademyLogo} alt="Crowd Academy Logo" />
            </Link>
            <Link className="Logo-text" to="/">
                <h4>CrowdAcademy</h4>
            </Link>
            <nav className="navbar" aria-label="Main Navigation">
                <Link to="/" className="navbar-link-item">Home</Link>
                <Link to="/recent" className="navbar-link-item">Recent</Link>
                <Link to="/instructor/inbox" className="navbar-link-item">Inbox</Link>
                <Link to="" className="navbar-link-item">Messages</Link>
                <Link to="/settings" className="navbar-link-item">Settings</Link>
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : user ? (
                    <>
                        <Link to="/account" className="navbar-link-item">
                            <div className="account-data">
                                <img className="Log-in-user-image" src={user.profile.avatar} alt="User Avatar" />
                                <div className="info">
                                    <p>{formatString(user.username)}</p>
                                    <p>{truncateString(user.email, 20)}</p> {/* Truncate email here */}
                                </div>
                            </div>
                        </Link>
                        <Link to="/logout" className="navbar-link-item">Logout</Link>
                    </>
                ) : (
                    <Link to="/auth" className="navbar-link-item">Signin</Link>
                )}
            </nav>
        </aside>
    );
}

export default SideBar;
