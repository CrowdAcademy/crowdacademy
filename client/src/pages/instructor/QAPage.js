import React from 'react';
import { useParams } from 'react-router-dom';
import CrowndAcademy from '../../assets/icon_tr.png';
import './QAPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faImage, faVideo, faMicrophone, faLink } from '@fortawesome/free-solid-svg-icons';
import { QuestionData } from './sampleQuestion'; // Importing the QuestionData array

function QuestionResponsePage() {
    
    const { slug } = useParams();

    const question = QuestionData.find(item => item.slug === slug);

    const [formType, setFormType] = React.useState('notes');

    const handleIconListClick = (type) => {
        setFormType(type);
    }

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
                                <textarea /><br />
                                <input className="add-format-btn" type="submit" value="add" />
                            </form>
                        )}
                        {formType === 'videos' && (
                            <form className="add-video-form">
                                <p>A video response can visually illustrate concepts and provide a more engaging explanation.Consider recording a video when visuals or demonstrations can enhance understanding.Videos are effective for tutorials, demonstrations, or sharing personal insights related to the question.</p><br />
                                <label>Select a video file</label>
                                <input className="attach-file-input" type="file" accept="video/*" /><br />
                                <input className="add-format-btn" type="submit" value="add" />
                            </form>
                        )}
                        {formType === 'images' && (
                            <form className="add-image-form">
                                <p>Images can quickly convey information and support your written response.Use images to show examples, diagrams, charts, or graphs relevant to the question.Incorporating images can enhance comprehension and provide visual context for your response.</p><br />
                                <label>Select an image file</label>
                                <input className="attach-file-input" type="file" accept="image/*" /><br />
                                <input className="add-format-btn" type="submit" value="add" />
                            </form>
                        )}
                        {formType === 'audios' && (
                            <form className="add-audio-form">
                                <p>An audio response offers a personal touch and can convey tone and emotion.Use audio recordings to provide verbal explanations, storytelling, or instructions.Audio responses are beneficial when verbal communication adds value or clarity to your response.</p><br />
                                <label>Select a audio file</label>
                                <input className="attach-file-input" type="file" accept="audio/*" /><br />
                                <input className="add-format-btn" type="submit" value="add" />
                            </form>
                        )}
                        {formType === 'links' && (
                            <form className="add-link-form">
                                <p>Include a link to relevant external resources that further elaborate on the question or your response.Share articles, studies, websites, or multimedia content that provide additional context or insights.Links can complement your response by directing users to more in-depth resources for further exploration.</p><br />
                                <label>Enter a link</label>
                                <input className="attach-file-input link-input" type="url" /><br />
                                <input className="add-format-btn" type="submit" value="add" />
                            </form>
                        )}
                        <div className="summary-track-container"></div>
                    </div>
                </div>
                <div className="bottom-bar"></div>
            </div>
            <div className="response-main-preview-container"></div>
        </div>
    );
}

export default QuestionResponsePage;