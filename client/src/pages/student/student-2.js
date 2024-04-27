import React from 'react';
import './studenthp.css';
import CrowdAcademyLogo from '../../assets/icon_tr.png';
import Hero from '../../components/hero';
import Answer from './Answer';
import Footer from '../../components/footer';  


function App() {
    return (
        <div className="app-container">
            {/* Left side */}
            <div className="left-side">
                <div className="left-content">
                    <button>My Stats</button>
                    <button>Study</button>
                    <button>Subject</button>
                    <button>Posts</button>
                    <button>Student Communities</button>
                    <button className="logout-btn">LOGOUT</button>
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
        </div>
    );
}

const Student = () => {
    // Array of data for each rectangle
    const rectangles = [
        {
            content: "Coding",
            backgroundColor: '#ACDFF7'
        },
        {
            content: "Programming",
            backgroundColor: '#FFDAB9'
        },
        {
            content: "Web Development",
            backgroundColor: '#D3D3D3'
        }
    ];

    return (
        <div>
            <h1> Answers </h1>
            {/* Map over the rectangles array to render the Answer component */}
            {rectangles.map((rectangle, index) => (
                <div key={index} style={{ backgroundColor: rectangle.backgroundColor, marginBottom: '20px' }}>
                    <Answer 
                        content={rectangle.content} 
                        isPaid={false} 
                        profilePhoto="../../assets/Profile.jpeg"  
                        userId="User123" 
                        rating={4}
                        videoLink="https://example.com/video"
                        bookLink="https://example.com/book.pdf"
                        quizLink="https://example.com/quiz"
                    />
                </div>
            ))}
        </div>
    );
}

export default App;
