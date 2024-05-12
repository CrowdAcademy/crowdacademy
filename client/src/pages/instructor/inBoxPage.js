import React from 'react';
import CrowdAcademyLogo from '../../assets/icon_tr.png';
import UserImage from '../../assets/samples/user-1.png';
import Footer from '../../components/footer';
import './homePage.css';
import './inbox.css';
import { MessageData } from '../../db/sampleInboxData';
import Message from './message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

function InstructorInboxPage() {
    const totalMessages = MessageData.length;

    const MessageElement = MessageData.map(message => (
        <Message 
            key={message.id}
            id={message.id}
            slug={message.slug}
            content={message.content} 
            date={message.date} 
            author={message.author}
        />
    ));

    return (
        <div className="home-container">
            <div className="home-main-container">
                <nav className="navbar">
                    <a className="navbar-link-item">My stats</a>
                    <a className="navbar-link-item">Contents</a>
                    <a className="navbar-link-item">Class</a>
                    <a className="navbar-link-item">Content creator communities</a>
                </nav>
                <section className="questions-display-container">
                    <h3 className="questions-container-header">Messages ({totalMessages})</h3>
                    <div className="hr"></div>
                    {MessageElement}
                </section>
                <Footer className="instructor-home-footer" />
            </div>          
            <div className="home-aside-container">
                <img className="Logo-design" src={CrowdAcademyLogo} alt="Crowd Academy Logo" />
                <h4 className="Logo-text">Crownd Academy</h4>
                <nav className="navbar">
                    <a className="navbar-link-item">Home</a>
                    <a className="navbar-link-item">Recent</a>
                    {/* is going to be about the recent action, activities e.g answer to a Question */}
                    <a className="navbar-link-item">Inbox</a>
                    <a className="navbar-link-item">Messages</a>
                    <a className="navbar-link-item">Settings</a>
                </nav>
                <img className="Log-in-user-image" src={UserImage} alt="User" />
                <a className="icon-log-out"><FontAwesomeIcon className="power-off" icon={faPowerOff} /></a>
            </div>  
        </div>
    )
}

export default InstructorInboxPage;