import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CrowndAcademy from '../../assets/icon_tr.png';
import './QAPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faImage, faVideo, faMicrophone, faLink } from '@fortawesome/free-solid-svg-icons';
import { QuestionData } from '../../db/sampleQuestion';

function QuestionResponsePage() {

    const { slug } = useParams();

    const question = QuestionData.find(item => item.slug === slug);

    const [formType, setFormType] = React.useState('notes');
    const [inputValue, setInputValue] = useState('');
    const [videoInputValue, setVideoInputValue] = useState('');
    const [imageInputValue, setImageInputValue] = useState('');
    const [audioInputValue, setAudioInputValue] = useState('');
    const [linkInputValue, setLinkInputValue] = useState('');

    const [contents, setContents] = useState([]);
    const [editState, setEditState] = useState(false);
    const [editPos, setEditPos] = useState(-1);

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
        <div className="response-container">
            <div className="response-main-container">
                <div className="topbar">
                    {/* <img className="Logo-design" src={CrowndAcademy} /> */}
                    <h4 className="Logo-text">Crownd Academy</h4>
                </div>
                <div className="response-main-inner-left-container">
                    <h3>Formulate a response to:</h3>
                    <div className="question-card">
                        <div className="question-card-details">
                            <p className="question-card-content">{question.content}</p>
                            <p className="question-card-date">{question.date}</p>
                            <address className="question-card-author">From {question.author}</address>
                        </div>
                        <p className="note-to-responder">
                            Your response to a question can include a variety of formats such as text notes, videos, images, audio recordings, and links. Combine and match these formats to provide a comprehensive and effective answer that best suits the nature of the question.
                        </p>
                    </div>

                    <div className="add-response-content-icon-item-container">
                        <a className="icons" onClick={() => handleIconListClick('notes')}><FontAwesomeIcon icon={faAlignJustify} /></a>
                        <a className="icons" onClick={() => handleIconListClick('videos')}><FontAwesomeIcon icon={faVideo} /></a>
                        <a className="icons" onClick={() => handleIconListClick('images')}><FontAwesomeIcon icon={faImage} /></a>
                        <a className="icons" onClick={() => handleIconListClick('audios')}><FontAwesomeIcon icon={faMicrophone} /></a>
                        <a className="icons" onClick={() => handleIconListClick('links')}><FontAwesomeIcon icon={faLink} /></a>
                        {/* <a><FontAwesomeIcon icon = {faLink} /></a> */}
                        {/* file note */}
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
                                <input className="attach-file-input link-input" type="url" onChange={handleLinkInputChange} /><br />
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
    );
}

export default QuestionResponsePage;