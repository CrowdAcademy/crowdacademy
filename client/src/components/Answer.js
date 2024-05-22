import React from 'react';
import { Link } from 'react-router-dom';



const Answer = ({ content, isPaid, profilePhoto, userId, rating, videoLink, bookLink, quizLink, detailedContent, slug }) => {
    return (
        <div className="answer-container">
            <div className="user-info-container">
                <img src={profilePhoto} alt="Profile" className="profile-photo" />
                <div>
                    <p>{`User ID: ${userId}`}</p>
                    <div>
                        {Array.from({ length: rating }, (_, i) => (
                            <span key={i} className="star-rating">★</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className='lesson-content'>
                <Link to={`/lesson/${slug}`} className="lesson-link">
                    <p>{content}</p>
                </Link>
                
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
