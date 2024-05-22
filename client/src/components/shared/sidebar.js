import "./base.css";
import React from 'react';
import { Link } from 'react-router-dom';
import UserImage from '../../assets/samples/user-1.png';
import CrowdAcademyLogo from '../../assets/icon_tr.png';
import { useUser } from '../../context/UserContext';

function SideBar() {
    const { user, loading } = useUser();

    return (
        <div className="home-aside-container">
            <Link to="/">
                <img className="Logo-design" src={CrowdAcademyLogo} alt="Crowd Academy Logo" />
            </Link>
            <Link className="Logo-text" to="/">
                <h4>CrowdAcademy</h4>
            </Link>
            <nav className="navbar">
                <Link to="/" className="navbar-link-item">Home</Link>
                <Link to="/recent" className="navbar-link-item">Recent</Link>
                <Link to="/instructor/inbox" className="navbar-link-item">Inbox</Link>
                <Link to="" className="navbar-link-item">Messages</Link>
                <Link to="/settings" className="navbar-link-item">Settings</Link>
                {loading ? (
                    <div>Loading...</div>
                ) : user ? (
                    <>
                        <Link to="/account" className="navbar-link-item">
                            <div className='account-data'>
                                <div className='info'>
                                    <p>{user.username}</p>
                                    <p>{user.email}</p>
                                </div>
                                <img className="Log-in-user-image" src={UserImage} alt="User" />
                            </div>
                        </Link>
                        <Link to="/logout" className="navbar-link-item">Logout</Link>
                    </>
                ) : (
                    <Link to="/auth" className="navbar-link-item">Signin</Link>
                )}
            </nav>
        </div>
    );
}

export default SideBar;
