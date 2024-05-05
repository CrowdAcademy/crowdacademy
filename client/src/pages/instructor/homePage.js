import React from 'react';
import CrowdAcademyLogo from '../../assets/icon_tr.png';
import UserImage from '../../assets/samples/user-1.png';
import Footer from '../../components/footer';
import './homePage.css';
import { QuestionData } from './sampleQuestion';
import Question from './question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

function InstructorHomePage() {
    const totalQuestion = QuestionData.length;

    const QuestionElements = QuestionData.map(question => (
        <Question 
            key={question.id}
            id={question.id}
            slug={question.slug}
            content={question.content} 
            date={question.date} 
            author={question.author}
            image={question.image}
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
                    <h3 className="questions-container-header">Questions ({totalQuestion})</h3>
                    <div className="hr"></div>
                    <div className="inner-container">
                        {QuestionElements}
                    </div>
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
    );
}

export default InstructorHomePage;
