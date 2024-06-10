import "./messagePage.css"
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageData } from '../../../db/sampleInboxData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashCan, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../components/footer';
import UserImage from '../../assets/samples/user-1.png';
import CrowdAcademyLogo from '../../assets/icon_tr.png';



function MessagePage() {

    const { slug } = useParams();

    const message = MessageData.find(item => item.slug === slug);

    return (
        <div className="home-container">
            <div className="home-main-container">
                <nav className="navbar">
                    <a className="navbar-link-item">My stats</a>
                    <a className="navbar-link-item">Contents</a>
                    <a className="navbar-link-item">Class</a>
                    <a className="navbar-link-item">Content creator communities</a>
                </nav>
                <section className="message-display-container">
                    <div className="message-container-header">
                        <a className="icons" ><FontAwesomeIcon icon = {faArrowLeft} /></a>
                        <a className="icons" ><FontAwesomeIcon icon = {faTrashCan} /></a>
                    </div>
                    <div className="hr"></div>
                    <div className="message-inner-container">
                        <div className = "message-inner-inner">
                            <img src = {UserImage} className = "sender-image"/>
                            <div className = "sender-status-container">
                                <p>From {message.author}</p>
                                <p>Le {message.date}</p>
                            </div>
                        </div>
                        <h2>{message.slug}</h2>
                        <p>{message.content}</p>

                        <form className = "reply-form">
                            <textarea/>
                            <input type = "submit" value = "respond" />
                        </form>
                    </div>
                </section>
                <Footer className="instructor-home-footer" />
            </div> 
            <div className="home-aside-container">
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
        </div>

/*         <div>
            <div>
                <a><FontAwesomeIcon icon = {faArrowLeft} /></a>
                <a><FontAwesomeIcon icon = {faTrashCan} /></a>
            </div>
            <div>
                <h2>slug</h2>
                <div>from when</div>

                <form>
                    <input type = "submit" value = "respond" />
                </form>
            </div>
        </div> */
    )
}

export default MessagePage;