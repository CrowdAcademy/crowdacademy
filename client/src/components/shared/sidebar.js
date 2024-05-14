const sidebar = (

) => {

    return <div className="home-aside-container">
                <img className="Logo-design" src={CrowdAcademyLogo} alt="Crowd Academy Logo" />
                <h4 className="Logo-text">Crownd Academy</h4>
                <nav className="navbar">
                    <a className="navbar-link-item" href = "/instructor/home">Home</a>
                    <a className="navbar-link-item">Recent</a>
                    {/* is going to be about the recent action, activities e.g answer to a Question */}
                    <a className="navbar-link-item" href = "/instructor/inbox">Inbox</a>
                    <a className="navbar-link-item">Messages</a>
                    <a className="navbar-link-item">Settings</a>
                </nav>
                <img className="Log-in-user-image" src={UserImage} alt="User" />
                <a className="icon-log-out"><FontAwesomeIcon className="power-off" icon={faPowerOff} /></a>
            </div>
}


export default sidebar;