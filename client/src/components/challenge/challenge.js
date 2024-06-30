import "./challenge.css";
import React from 'react';
import { Link } from 'react-router-dom';
import avatarDefault from "../../assets/avatar-default.svg";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Challenge({ id, title, description, author, createdAt, refreshLessons, image, showNote = false, showImage = true, link_to_challenge = true }) {
    const { user } = useUser();

    const handleDelete = async () => {
        if (user && user.token) {
            const confirmDelete = window.confirm(`Are you sure you want to delete the challenge with id: ${id}?`);
            if (confirmDelete) {
                try {
                    const response = await fetch(`/challenges/delete/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${user.token.current_token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        alert(`Challenge with id: ${id} has been deleted.`);
                        refreshLessons();
                    } else {
                        const errorData = await response.json();
                        console.error('Failed to delete challenge:', errorData);
                        alert('Failed to delete challenge.');
                    }
                } catch (error) {
                    console.error('Error deleting challenge:', error);
                    alert('Error deleting challenge.');
                }
            }
        } else {
            alert('You do not have permission to delete this challenge.');
        }
    };

    const ChallengeDetails = () => {
        return (
            <>
                <h3 className="challenge-card-title">{title}</h3>
                <p className="challenge-card-description">{description}</p>
            </>
        );
    };

    return (
        <div className="challenge-card">
            <div className="challenge-card-details">
                {link_to_challenge ? (
                    <Link to={`/challenges/${id}`}>
                        <ChallengeDetails />
                    </Link>
                ) : (
                    <ChallengeDetails />
                )}

                <Link className="author-info" to={`/profiles/${author}`}>
                    <p className="challenge-card-author">From {author}</p>
                    <p className="challenge-card-date">{new Date(createdAt).toLocaleDateString()}</p>
                </Link>
            </div>

            {showImage && (
                <Link className="author-info" to={`/profiles/${author}`}>
                    <img className="challenge-author-image" src={image ? image : avatarDefault} alt="User" />
                </Link>
            )}

            <div className="challenge-card-actions">
                {showNote ? (
                    <p className="note-to-responder">
                        Your response to a challenge can include a variety of formats such as text notes, videos, images, audio recordings, and links. Combine and match these formats to provide a comprehensive and effective lesson that best suits the nature of the challenge.
                    </p>
                ) : (
                    <>
                        <Link className="challenge-card-respond-btn" to={`/respond/${id}`}>Respond</Link>
                        {user && user.permissions.includes('delete_lesson') && (
                            <button className="delete-btn" onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Challenge;
