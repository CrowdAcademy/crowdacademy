import React, { useState } from 'react'; // Importing useState along with React
import './studenthp.css';
import CrowdAcademyLogo from '../../assets/icon_tr.png';
import Hero from '../../components/hero';
import Answer from './Answer';
import Footer from '../../components/footer';
import { faMarsDouble } from '@fortawesome/free-solid-svg-icons';


function App() {
    const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
      setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
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
                <div key={index} style={{
                    backgroundColor: 'linear-gradient(to right, #ffcccb, #87cefa)', // Gradient background
                    marginBottom: '20px',
                    border: '20px double faMars', // Double border with Mars symbol
                    borderRadius: '60px', // Rounded corners
                    borderColor: 'red', // Border color (red)
                    animation: 'pulse 2s infinite', // Add a pulsating animation
                    /* Add other styles here if needed */
                  }}>
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
