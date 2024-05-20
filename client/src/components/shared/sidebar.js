import UserImage from '../../assets/samples/user-1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import CrowdAcademyLogo from '../../assets/icon_tr.png';


function SideBar() {
    return(
        <div className="home-aside-container">
            <img className="Logo-design" src={CrowdAcademyLogo} alt="Crowd Academy Logo" />
            <h4 className="Logo-text">Crownd Academy</h4>
            <nav className="navbar">
                <a className="navbar-link-item">Home</a>
                <a className="navbar-link-item">Recent</a>
                {/* is going to be about the recent action, activities e.g answer to a Question */}
                <a className="navbar-link-item" href = "/instructor/inbox">Inbox</a>
                <a className="navbar-link-item">Messages</a>
                <a className="navbar-link-item">Settings</a>
            </nav>
            <img className="Log-in-user-image" src={UserImage} alt="User" />
            <a className="icon-log-out"><FontAwesomeIcon className="power-off" icon={faPowerOff} /></a>
        </div>
    )
}

export default SideBar;