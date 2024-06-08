import React from 'react';
import { Link } from 'react-router-dom';
import avatarDefault from "../assets/avatar-default.svg";

function Question({ id, title, description, author, createdAt, showNote = false, showImage = true }) {
    return (
        <Link to={`/questions/${id}`} className="question-card">
            <div className="question-card-details">
                <h3 className="question-card-title">{title}</h3>
                <p className="question-card-description">{description}</p>
                <Link className="author-info" to={`/profiles/${author}`}>
                    <p className="question-card-author">From {author}</p>
                    <p className="question-card-date">{new Date(createdAt).toLocaleDateString()}</p>
                </Link>
            </div>

            {
                showImage && (
                    <Link className="author-info" to={`/profiles/${author}`}>
                        <img className="question-author-image" src={avatarDefault} alt="User" />
                    </Link>
                )
            }

            <div className="question-card-actions">
                {
                    showNote ? (
                        <p className="note-to-responder">
                            Your response to a question can include a variety of formats such as text notes, videos, images, audio recordings, and links. Combine and match these formats to provide a comprehensive and effective answer that best suits the nature of the question.
                        </p>
                    ) : (
                        <Link className="question-card-respond-btn" to={`/respond/${id}`}>Respond</Link>
                    )
                }
            </div>
        </Link>
    );
}

export default Question;
