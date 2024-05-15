import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Answer = ({ content, isPaid, profilePhoto, userId, rating, videoLink, bookLink, quizLink, detailedContent, slug }) => {
    return (
        <div style={{ 
            backgroundColor: 'white', 
            border: '1px solid #ccc', 
            padding: '20px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',  // Adjusted width
            minHeight: '240px',  // Adjusted minimum height,
            borderRadius: "1rem",
        }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%', 
                marginBottom: '15px'  // Increased margin
            }}>
                <img src={profilePhoto} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <div>
                    <p>{`User ID: ${userId}`}</p>
                    <div>
                        {Array.from({ length: rating }, (_, i) => (
                            <span key={i} style={{ color: 'gold' }}>★</span>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                {/* Wrap the content inside a Link component */}
                <Link to={`/lesson/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <p>{content}</p>
                </Link>
                
                {/* Display detailed content */}
                <p>{detailedContent}</p>
                {isPaid && <p className='premium-banner'><strong>Premium lesson</strong></p>}
                
                {videoLink && (
                    <div>
                        <strong>Video Link:</strong>
                        <a href={videoLink} target="_blank" rel="noopener noreferrer">Watch Video</a>
                    </div>
                )}

                {bookLink && (
                    <div>
                        <strong>Reference Book:</strong>
                        <a href={bookLink} target="_blank" rel="noopener noreferrer">Download Book</a>
                    </div>
                )}

                {quizLink && (
                    <div>
                        <strong>Quiz Form:</strong>
                        <a href={quizLink} target="_blank" rel="noopener noreferrer">Take Quiz</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Answer;
