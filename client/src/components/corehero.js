import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faImage, faArrowRight } from '@fortawesome/free-solid-svg-icons';



export default function CoreHero() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState({});


    const handleTitleChange = event => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    };

    const handleTagsChange = event => {
        const tagsArray = event.target.value.split(",");
        setTags(tagsArray);
    };

    const clearFields = () => {
        setTitle("");
        setDescription("");
        setTags([]);
    }

    const formatTags = tags.map((t, i) => {
        return (i !== tags.length - 1) ? `${t.trim()}, ` : t.trim();
    }).join('').trim();

    const handleChallengeSubmit = event => {
        event.preventDefault();

        if (title === '') {
            setMessage({ type: 'warning', content: 'Please enter a title.' });
            setTimeout(() => {
                setMessage({});
            }, 3000);
            return;
        }

        if (description === '') {
            setMessage({ type: 'warning', content: 'Please enter a description.' });
            setTimeout(() => {
                setMessage({});
            }, 3000);
            return;
        }

        const challengeData = {
            title: title,
            description: description,
            tags: tags
        };

        const token = localStorage.getItem('token');

        fetch('/challenges/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(challengeData)
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error('Failed to create challenge.');
                }
                setMessage({ type: 'success', content: 'Challenge created successfully!' });
                clearFields();

                setTimeout(() => {
                    setMessage({});
                }, 3000);
            })
            .catch(error => {
                setMessage({ type: 'error', content: error.message });
                setTimeout(() => {
                    setMessage({});
                }, 3000);
            });
    };


    return (
        <div className="large-input-container">

            {
                Object.keys(message).length !== 0 && (
                    <div className={`message-div fade-out ${message.type}`}>
                        <p>{message.content}</p>
                    </div>
                )
            }

            <div className="input-container-form-field">
                <input name="title" value={title} type="text" placeholder="Enter Title" onChange={handleTitleChange} />
            </div>

            <div className="input-container-form-field">
                <textarea name="description" value={description} cols="110" rows="7" placeholder="Ask your question right away" onChange={handleDescriptionChange}></textarea>
            </div>

            <div className="input-container-form-field">
                <input name="tags" value={formatTags} placeholder="Enter question tags, separated by commas" type="text" onChange={handleTagsChange} />
            </div>

            <div className="textarea-icons-container">
                <div className="textarea-input-icons">
                    <a href="">
                        <FontAwesomeIcon icon={faKeyboard} className="icon-black-color" />
                    </a>
                    <a href="">
                        <FontAwesomeIcon icon={faImage} className="icon-black-color" />
                    </a>
                </div>
                <a href="" className="question-submit-icon">
                    <FontAwesomeIcon icon={faArrowRight} onClick={handleChallengeSubmit} className="hero-submit-icon" />
                </a>
            </div>
        </div>
    );
};