import './QAPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faImage, faVideo, faMicrophone, faLink } from '@fortawesome/free-solid-svg-icons';
import Question from '../../components/question';

function QuestionResponsePage() {
    const { slug } = useParams();
    const [question, setQuestion] = useState(null);
    const [error, setError] = useState(null);

    const [formType, setFormType] = useState('notes');
    const [inputValue, setInputValue] = useState('');
    const [videoInputValue, setVideoInputValue] = useState('');
    const [imageInputValue, setImageInputValue] = useState('');
    const [audioInputValue, setAudioInputValue] = useState('');
    const [linkInputValue, setLinkInputValue] = useState('');

    const [contents, setContents] = useState([]);
    const [editState, setEditState] = useState(false);
    const [editPos, setEditPos] = useState(-1);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/challenges/${slug}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Question not found');
                }
                return response.json();
            })
            .then(data => {
                setQuestion(data);
            })
            .catch(error => {
                setError(error.message);
                console.error('There was an error fetching the question!', error);
            });
    }, [slug]);

    const handleIconListClick = (type) => {
        setFormType(type);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleVideoInputChange = (event) => {
        setVideoInputValue(event.target.value);
    };

    const handleImageInputChange = (event) => {
        setImageInputValue(event.target.value);
    };

    const handleAudioInputChange = (event) => {
        setAudioInputValue(event.target.value);
    };

    const handleLinkInputChange = (event) => {
        setLinkInputValue(event.target.value);
    };

    const addButtonClick = (event, type) => {
        event.preventDefault();
        let value = '';
        switch (type) {
            case 'notes':
                value = inputValue;
                setInputValue('');
                break;
            case 'videos':
                value = videoInputValue;
                setVideoInputValue('');
                break;
            case 'images':
                value = imageInputValue;
                setImageInputValue('');
                break;
            case 'audios':
                value = audioInputValue;
                setAudioInputValue('');
                break;
            case 'links':
                value = linkInputValue;
                setLinkInputValue('');
                break;
            default:
                break;
        }
        if (value.trim() !== '') {
            setContents([...contents, { type: type, value: value }]);
        }
    };

    const handleBlockClick = (type, position) => {
        if (type === "notes") {
            handleIconListClick(type);
            setInputValue(contents[position].value);
            setEditPos(position);
            setEditState(true);
        }
    };

    const editButtonClick = (event) => {
        event.preventDefault();

        if (inputValue.trim() !== '') {
            const updatedContents = [...contents];
            updatedContents[editPos].value = inputValue; // Use editPos here

            setContents(updatedContents);
            setInputValue('');

            setEditState(false);
            setEditPos(-1);
        }
    };

    const renderContentForm = (type) => {
        switch (type) {
            case 'notes':
                return (
                    <div className="add-note-container">
                    </div>
                );
            case 'videos':
                return (
                    <form className="add-video-form">
                    </form>
                );
            case 'images':
                return (
                    <form className="add-image-form">
                    </form>
                );
            case 'audios':
                return (
                    <form className="add-audio-form">
                    </form>
                );
            case 'links':
                return (
                    <form className="add-link-form">
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        question ? (
            <div className="response-container">
                <div className="response-main-container">
                    <div className="topbar">
                        <h4 className="Logo-text">CrowdAcademy</h4>
                    </div>
                    <div className="response-main-inner-left-container">
                        <h3>Formulate a response to:</h3>

                        <Question
                            title={question.title}
                            description={question.description}
                            author={question.author_username}
                            createdAt={question.createdAt}
                            id={question.id}
                            showNote={true}
                            showImage={false}
                        />

                        <div className="add-response-content-icon-item-container">
                            <a className="icons" onClick={() => handleIconListClick('notes')}><FontAwesomeIcon icon={faAlignJustify} /></a>
                            <a className="icons" onClick={() => handleIconListClick('videos')}><FontAwesomeIcon icon={faVideo} /></a>
                            <a className="icons" onClick={() => handleIconListClick('images')}><FontAwesomeIcon icon={faImage} /></a>
                            <a className="icons" onClick={() => handleIconListClick('audios')}><FontAwesomeIcon icon={faMicrophone} /></a>
                            <a className="icons" onClick={() => handleIconListClick('links')}><FontAwesomeIcon icon={faLink} /></a>
                        </div>
                        <div className="add-res-resources-container">
                            {formType === 'notes' && (
                                <form className="add-note-form">
                                    <p>Use this option to craft a written explanation, clarification, or additional information regarding the question.Notes are ideal for providing detailed responses, insights, or context in written form.</p><br />
                                    <textarea value={inputValue} onChange={handleInputChange} /><br />

                                    {editState ? (
                                        <button className="add-format-btn" onClick={(event) => editButtonClick(event)}>Edit</button>
                                    ) : (
                                        <button className="add-format-btn" onClick={(event) => addButtonClick(event, "notes")}>Add</button>
                                    )}

                                </form>
                            )}
                            {formType === 'videos' && (
                                <form className="add-video-form">

                                    <p>A video response can visually illustrate concepts and provide a more engaging explanation.Consider recording a video when visuals or demonstrations can enhance understanding.Videos are effective for tutorials, demonstrations, or sharing personal insights related to the question.</p><br />
                                    <label>Select a video file</label>
                                    <input className="attach-file-input" type="file" accept="video/*" onChange={handleVideoInputChange} /><br />
                                    <button className="add-format-btn" onClick={(event) => addButtonClick(event, "videos")}>Add</button>
                                </form>
                            )}
                            {formType === 'images' && (
                                <form className="add-image-form">
                                    <p>Images can quickly convey information and support your written response.Use images to show examples, diagrams, charts, or graphs relevant to the question.Incorporating images can enhance comprehension and provide visual context for your response.</p><br />
                                    <label>Select an image file</label>
                                    <input className="attach-file-input" type="file" accept="image/*" onChange={handleImageInputChange} /><br />
                                    <button className="add-format-btn" onClick={(event) => addButtonClick(event, "images")}>Add</button>
                                </form>
                            )}
                            {formType === 'audios' && (
                                <form className="add-audio-form">
                                    <p>An audio response offers a personal touch and can convey tone and emotion.Use audio recordings to provide verbal explanations, storytelling, or instructions.Audio responses are beneficial when verbal communication adds value or clarity to your response.</p><br />
                                    <label>Select a audio file</label>
                                    <input className="attach-file-input" type="file" accept="audio/*" onChange={handleAudioInputChange} /><br />
                                    <button className="add-format-btn" onClick={(event) => addButtonClick(event, "audios")}>Add</button>
                                </form>
                            )}
                            {formType === 'links' && (
                                <form className="add-link-form">
                                    <p>Include a link to relevant external resources that further elaborate on the question or your response.Share articles, studies, websites, or multimedia content that provide additional context or insights.Links can complement your response by directing users to more in-depth resources for further exploration.</p><br />
                                    <label>Enter a link</label>
                                    <input className="attach-file-input link-input" type="url" value={linkInputValue} onChange={handleLinkInputChange} /><br />
                                    <button className="add-format-btn" onClick={(event) => addButtonClick(event, "links")}>Add</button>
                                </form>
                            )}
                            <div className="summary-track-container"></div>
                        </div>
                    </div>
                    <div className="bottom-bar"></div>
                </div>
                <div className="response-main-preview-container">
                    {contents.map((content, index) => (
                        <div key={index} className='added-content-container' onClick={() => handleBlockClick(content.type, index)}>
                            {console.log(contents)}
                            {renderContentForm(content.type)}
                            {/* Render content based on type */}
                            <p className="added-content-value">{content.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="response-container">
                <div className="response-main-container">
                    <div className="topbar">
                        <h4 className="Logo-text">Crownd Academy</h4>
                    </div>
                    <div className="response-main-inner-left-container">
                        <div className="question-card">
                            <div className="question-card-details">
                                <p style={{ width: "10rem" }} className="question-card-content">Question not found</p>
                            </div>
                            <p className="note-to-responder">
                                Your response to a question can include a variety of formats such as text notes, videos, images, audio recordings, and links. Combine and match these formats to provide a comprehensive and effective answer that best suits the nature of the question.
                            </p>
                        </div>
                        <Link to="/questions" className="btn btn-primary">All Questions</Link>
                    </div>
                    <div className="bottom-bar"></div>
                </div>
                <div className="response-main-preview-container"></div>
            </div>
        )
    );

}



export default QuestionResponsePage;
