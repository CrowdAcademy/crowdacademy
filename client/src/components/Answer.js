import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext';
import avatarDefault from '../assets/avatar-default.svg';

const Answer = ({ id, content, isPaid, profilePhoto, userId, rating, videoLink, bookLink, quizLink, detailedContent, slug, fetchAnswers }) => {
    const { user } = useUser();

    const handleDelete = async () => {
        if (user && user.token) {
            const confirmDelete = window.confirm(`Are you sure you want to delete this lesson with id: ${id}?`);
            if (confirmDelete) {
                try {
                    const response = await fetch(`/lessons/delete/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${user.token.current_token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        alert(`Lesson with id: ${id} has been deleted.`);
                        fetchAnswers();
                    } else {
                        const errorData = await response.json();
                        console.error('Failed to delete lesson:', errorData);
                        alert('Failed to delete lesson.');
                    }
                } catch (error) {
                    console.error('Error deleting lesson:', error);
                    alert('Error deleting lesson.');
                }
            }
        } else {
            alert('You do not have permission to delete this lesson.');
        }
    };

    return (
        <div className="answer-container">
            <div className="user-info-container">
                <img src={profilePhoto ? profilePhoto : avatarDefault} alt="Profile" className="profile-photo" />
                <div>
                    <p>{userId}</p>
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

            {user && user.token && user.permissions.includes('delete_lesson') && (
                <button className="delete-button" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            )}
        </div>
    );
}

export default Answer;
