import React, { useState } from 'react';
import './studenthp.css';
import CrowdAcademyLogo from '../../assets/icon_tr.png';
import Hero from '../../components/hero';
import Answer from './Answer'; // Import the Answer component
import Footer from '../../components/footer';
import { AnswerData } from '../../db/sampleAnswers';
import { Link } from 'react-router-dom';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Define an array of buttons with their labels and routes
    const buttons = [
        { label: 'My Stats', route: './my-stat/' },
        { label: 'Blog', route: './blog' },
        { label: 'Cursus', route: './cursus' },
        { label: 'Posts-News', route: './posts-news' },
        { label: 'Student Communities', route: './student-communities' },
        { label: 'Search', route: './Search' }
    ];

    const Site_buttons = [
        { label: 'Forum', route: './Forum' },
        { label: 'Podcasts', route: './Podcasts' },
        { label: 'Recent', route: './Recent' },
        { label: 'Inbox', route: './Inbox' },
        { label: 'Messages', route: './Messages' },
        { label: 'Settings', route: './Settings' }
    ];

    return (
        <>
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
            {/* Left side */}
            <div className="left-side">
                <div className="left-content">
                    {buttons.map((button, index) => (
                        <Link key={index} to={button.route}>
                            <button>{button.label}</button>
                        </Link>
                    ))}
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
                    {Site_buttons.map((button, index) => (
                    <React.Fragment key={index}>
                        <Link to={button.route}>
                            <button>{button.label}</button>
                        </Link>
                        {index !== Site_buttons.length - 1 && <span>&nbsp;</span>}
                    </React.Fragment>
                ))}
                    <div className="avatar-section">
                        <img src=" https://d2oe9fogqkc3hl.cloudfront.net/static/illustrations/category-pages/computer-science.png" alt="Avatar" className="avatar" />
                        <p></p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
        <Footer />
        </>
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
