import React, { useState } from 'react';
import './studenthp.css';
import CrowdAcademyLogo from '../../assets/icon_tr.png';
import Hero from '../../components/hero';
import Answer from './Answer'; // Import the Answer component
import Footer from '../../components/footer';
import { AnswerData } from '../../db/sampleAnswers';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
            {/* Left side */}
            <div className="left-side">
                <div className="left-content">
                    <button>My Stats</button>
                    <button>Blog</button>
                    <button>Cursus</button>
                    <button>Posts-News</button>
                    <button>Student Communities</button>
                    <button className="logout-btn">FILTER</button>
                    <Hero />
                    <div>
                        <Student />
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="right-side">
                <div className="right-content">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={CrowdAcademyLogo} alt="logo-image" style={{ width: '100px' }} />
                    </div>
                    <h2>Crowd Academy</h2>
                    <br />
                    <button>Home</button>
                    <br />
                    <br />
                    <button>Forum</button>
                    <br />
                    <br />
                    <button>Podcasts</button>
                    <br />
                    <button>Recent</button>
                    <br />
                    <br />
                    <button>Inbox</button>
                    <br />
                    <br />
                    <button>Messages</button>
                    <br />
                    <br />
                    <button>Settings</button>
                    <div className="avatar-section">
                        <img src=" " alt="Avatar" className="avatar" />
                        <p>Profile</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
}

const Student = () => {
    return (
        <div>
            <h1>Answers</h1>
            {/* Map over the AnswerData array to render each answer */}
            {AnswerData.map((question, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <Answer
                        userId={question.id}
                        content={question.content}
                        date={question.date}
                        author={question.author}
                        profilePhoto={question.image}
                        slug={question.slug}
                        isPaid={question.isPaid}
                    />
                </div>
            ))}
        </div>
    );
}

export default App;
