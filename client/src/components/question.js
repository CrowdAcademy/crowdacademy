import React from 'react';
import UserImage from '../assets/samples/user-6.png'

function Question({ id, title, description, author, createdAt, showNote=false, showImage=true }) {
    return (
        <div className="question-card">
            <div className="question-card-details">
                <h3 className="question-card-title">{title}</h3>
                <p className="question-card-description">{description}</p>
                <p className="question-card-author">From {author}</p>
                <p className="question-card-date">{createdAt}</p>
            </div>
            {showImage && <img className="question-author-image" src={UserImage} alt="User" />}
            {
                showNote ?
                    <p className="note-to-responder">
                        Your response to a question can include a variety of formats such as text notes, videos, images, audio recordings, and links. Combine and match these formats to provide a comprehensive and effective answer that best suits the nature of the question.
                    </p>
                    :
                    <a className="question-card-respond-btn" href={`/respond/${id}`}>Respond</a>
            }
        </div>
    );
}

export default Question;
