// Message.js
import "./message.css";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Message = ({ message, onClose }) => {
    return (
        <div className={`message-container ${message.type ? message.type : 'info'}`}>
            <div className="message">
                <p>{message.content}</p>
                <button className="close-btn" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
};

export default Message;
