import "./question.css";
import React from 'react';
import { Link } from 'react-router-dom';
import avatarDefault from "../../assets/avatar-default.svg";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Question({ id, title, description, author, createdAt, refreshLessons, image, showNote = false, showImage = true, link_to_question = true }) {
    const { user } = useUser();

    const handleDelete = async () => {
        if (user && user.token) {
            const confirmDelete = window.confirm(`Are you sure you want to delete the question with id: ${id}?`);
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
                        alert(`Question with id: ${id} has been deleted.`);
                        refreshLessons();
                    } else {
                        const errorData = await response.json();
                        console.error('Failed to delete question:', errorData);
                        alert('Failed to delete question.');
                    }
                } catch (error) {
                    console.error('Error deleting question:', error);
                    alert('Error deleting question.');
                }
            }
        } else {
            alert('You do not have permission to delete this question.');
        }
    };

    const QuestionDetails = () => {
        return (
            <>
                <h3 className="question-card-title">{title}</h3>
                <p className="question-card-description">{description}</p>
            </>
        );
    };

    return (
        <div className="question-card">
            <div className="question-card-details">
                {link_to_question ? (
                    <Link to={`/questions/${id}`}>
                        <QuestionDetails />
                    </Link>
                ) : (
                    <QuestionDetails />
                )}

                <Link className="author-info" to={`/profiles/${author}`}>
                    <p className="question-card-author">From {author}</p>
                    <p className="question-card-date">{new Date(createdAt).toLocaleDateString()}</p>
                </Link>
            </div>

            {showImage && (
                <Link className="author-info" to={`/profiles/${author}`}>
                    <img className="question-author-image" src={image ? image : avatarDefault} alt="User" />
                </Link>
            )}

            <div className="question-card-actions">
                {showNote ? (
                    <p className="note-to-responder">
                        Your response to a question can include a variety of formats such as text notes, videos, images, audio recordings, and links. Combine and match these formats to provide a comprehensive and effective answer that best suits the nature of the question.
                    </p>
                ) : (
                    <>
                        <Link className="question-card-respond-btn" to={`/respond/${id}`}>Respond</Link>
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

export default Question;
