import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faImage, faVideo, faMicrophone, faLink } from '@fortawesome/free-solid-svg-icons';
import Challenge from '../../../components/challenge/challenge';
import Topbar from '../../../components/shared/topbar';
import { capitalize } from '../../../utils/string';
import Message from '../../../components/shared/message';
import '../../../components/shared/base.css';
import './ChallengeResponsePage.css';

function ChallengeResponsePage() {
    const { slug } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [message, setMessage] = useState(null);
    const [formType, setFormType] = useState('text');
    const [inputValue, setInputValue] = useState('');
    const [videoInputValue, setVideoInputValue] = useState('');
    const [imageInputValue, setImageInputValue] = useState('');
    const [audioInputValue, setAudioInputValue] = useState('');
    const [linkInputValue, setLinkInputValue] = useState('');
    const [blocks, setBlocks] = useState([]);
    const [editState, setEditState] = useState(false);
    const [editPos, setEditPos] = useState(-1);
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonTags, setLessonTags] = useState([]);
    const [lessonDescription, setLessonDescription] = useState('');
    const [lessonTitleError, setLessonTitleError] = useState('');
    const [lessonDescriptionError, setLessonDescriptionError] = useState('');
    const [saved, setSaved] = useState(false);
    const [responseId, setResponseId] = useState(null);

    const token = localStorage.getItem('token');
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });

    const updateLessonData = (data) => {
        setLessonTitle(data.title);
        setLessonDescription(data.description);
        setLessonTags(data.tags);
        
        setBlocks(data.blocks);
    }

    const fetchChallenge = () => {
        fetch(`/challenges/${slug}`, { headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Challenge not found');
                }
                return response.json();
            })
            .then(data => {
                setChallenge(data);
            })
            .catch(error => {
                setMessage({ content: `Error fetching challenge: ${error.message}`, type: 'error' });
                console.error('Error fetching the challenge:', error);
            });
    }

    const fetchLesson = () => {
        fetch(`/lessons/${responseId}`, { headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lesson not found');
                }
                return response.json();
            })
            .then(data => {
                updateLessonData(data);
                console.log(`Lesson ${responseId} updated`);
                console.log(data);
            })
            .catch(error => {
                setMessage({ content: `Error fetching lesson: ${error.message}`, type: 'error' });
                console.error('Error fetching the lesson:', error);
            });
    }

    useEffect(() => {
        fetchChallenge();
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

    const handleTitleChange = event => {
        setLessonTitle(event.target.value);
        if (lessonTitleError) setLessonTitleError('');
    };

    const handleDescriptionChange = event => {
        setLessonDescription(event.target.value);
        if (lessonDescriptionError) setLessonDescriptionError('');
    };

    const handleTagsChange = event => {
        const tagsArray = event.target.value.split(",");
        setLessonTags(tagsArray);
    };

    const formatTags = lessonTags.map((t, i) => {
        return (i !== lessonTags.length - 1) ? `${t.trim()}, ` : t.trim();
    }).join('').trim();

    const addButtonClick = (event, type) => {
        event.preventDefault();

        if (!saved) {
            setMessage({ content: 'Please save the lesson before adding content.', type: 'error' });
            return;
        }

        let value = '';
        switch (type) {
            case 'text':
                value = inputValue.trim();
                setInputValue('');
                break;
            case 'videos':
                value = videoInputValue.trim();
                setVideoInputValue('');
                break;
            case 'images':
                value = imageInputValue.trim();
                setImageInputValue('');
                break;
            case 'audios':
                value = audioInputValue.trim();
                setAudioInputValue('');
                break;
            case 'links':
                value = linkInputValue.trim();
                setLinkInputValue('');
                break;
            default:
                break;
        }

        if (value !== '') {
            const blockData = {
                type: type,
                content: value,
                resource: type !== 'text'
            };

            fetch(`/blocks/${responseId}/create`, {
                method: 'POST',
                headers,
                body: JSON.stringify(blockData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to create ${type} block`);
                }
                return response.json();
            })
            .then(data => {
                fetchLesson();
                setMessage({ content: `${capitalize(type)} block added successfully.`, type: 'success' });
            })
            .catch(error => {
                setMessage({ content: `Failed to add ${type} block: ${error.message}`, type: 'error' });
                console.error(`Error creating ${type} block:`, error);
            });

            setBlocks([...blocks, { type: type, content: value }]);
        }
    };

    const handleBlockClick = (type, position) => {
        if (type === "text") {
            handleIconListClick(type);
            setInputValue(blocks[position].value);
            setEditPos(position);
            setEditState(true);
        }
    };

    const editButtonClick = (event) => {
        event.preventDefault();

        if (inputValue.trim() !== '') {
            const updatedContents = [...blocks];
            updatedContents[editPos].value = inputValue;

            setBlocks(updatedContents);
            setInputValue('');

            setEditState(false);
            setEditPos(-1);
        }
    };

    const saveLessonResponse = async () => {
        if (!lessonTitle) {
            setLessonTitleError('Please enter a lesson title.');
        }

        if (!lessonDescription) {
            setLessonDescriptionError('Please enter a lesson description.');
        }

        if (!lessonTitle || !lessonDescription) {
            setMessage({ content: 'Please enter the lesson title and description to save the lesson.', type: 'error' });
            return;
        }

        try {
            const response = await fetch(saved ? `/lessons/update/${responseId}` : '/lessons/create', {
                method: saved ? 'PUT' : 'POST',
                headers,
                body: JSON.stringify({
                    title: lessonTitle,
                    description: lessonDescription,
                    tags: lessonTags
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(`Failed to ${saved ? 'update' : 'save'} lesson response:`, data);
                throw new Error(data.message || `Failed to ${saved ? 'update' : 'save'} lesson response`);
            }

            if (!saved) {
                setSaved(true);
                setResponseId(data.lesson._id.$oid);
                setMessage({ content: 'Lesson created successfully.', type: 'success' });
            } else {
                setMessage({ content: 'Lesson updated successfully.', type: 'success' });
            }

            updateLessonData(data.lesson);

        } catch (error) {
            console.error(`Error ${saved ? 'updating' : 'saving'} lesson response:`, error);
            setMessage({ content: `Error ${saved ? 'updating' : 'saving'} lesson response: ${error.message}`, type: 'error' });
        }
    };

    const renderContentForm = (type) => {
        switch (type) {
            case 'text':
                return (
                    <form className="add-note-form">
                        <p>Use this option to craft a written explanation, clarification, or additional information regarding the challenge. Notes are ideal for providing detailed responses, insights, or context in written form.</p><br />
                        <textarea value={inputValue} onChange={handleInputChange} /><br />
                        {editState ? (
                            <button className="btn" onClick={(event) => editButtonClick(event)}>Edit</button>
                        ) : (
                            <button className="btn" onClick={(event) => addButtonClick(event, "text")}>Add</button>
                        )}
                    </form>
                );
            case 'videos':
                return (
                    <form className="add-video-form">
                        <p>A video response can visually illustrate concepts and provide a more engaging explanation. Consider recording a video when visuals or demonstrations can enhance understanding. Videos are effective for tutorials, demonstrations, or sharing personal insights related to the challenge.</p><br />
                        <label>Select a video file</label>
                        <input className="attach-file-input" type="file" accept="video/*" onChange={handleVideoInputChange} /><br />
                        <button className="add-format-btn" onClick={(event) => addButtonClick(event, "videos")}>Add</button>
                    </form>
                );
            case 'images':
                return (
                    <form className="add-image-form">
                        <p>Images can quickly convey information and support your written response. Use images to show examples, diagrams, charts, or graphs relevant to the challenge. Incorporating images can enhance comprehension and provide visual context for your response.</p><br />
                        <label>Select an image file</label>
                        <input className="attach-file-input" type="file" accept="image/*" onChange={handleImageInputChange} /><br />
                        <button className="add-format-btn" onClick={(event) => addButtonClick(event, "images")}>Add</button>
                    </form>
                );
            case 'audios':
                return (
                    <form className="add-audio-form">
                        <p>An audio response offers a personal touch and can convey tone and emotion. Use audio recordings to provide verbal explanations, storytelling, or instructions. Audio responses are beneficial when verbal communication adds value or clarity to your response.</p><br />
                        <label>Select an audio file</label>
                        <input className="attach-file-input" type="file" accept="audio/*" onChange={handleAudioInputChange} /><br />
                        <button className="add-format-btn" onClick={(event) => addButtonClick(event, "audios")}>Add</button>
                    </form>
                );
            case 'links':
                return (
                    <form className="add-link-form">
                        <p>Include a link to relevant external resources that further elaborate on the challenge or your response. Share articles, studies, websites, or multimedia content that provide additional context or insights. Links can complement your response by directing users to more in-depth resources for further exploration.</p><br />
                        <label>Enter a link</label>
                        <input className="attach-file-input link-input" type="url" value={linkInputValue} onChange={handleLinkInputChange} /><br />
                        <button className="add-format-btn" onClick={(event) => addButtonClick(event, "links")}>Add</button>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="response-container">
            <div className="response-main-container">
                <Topbar />
                <div className="response-main-inner-left-container">
                    {message && (
                        <Message message={message} onClose={() => setMessage(null)} />
                    )}
                    {challenge ? (
                        <>
                            <Challenge
                                key={challenge._id}
                                id={challenge._id}
                                title={challenge.title}
                                description={challenge.description}
                                createdAt={challenge.created_at}
                                author={challenge.author_username}
                                showNote={true}
                                showImage={false}
                                link_to_challenge={false}
                            />

                            <div className="challenge-details-form-container">
                                <form className='challenge-details-form'>
                                    <div>
                                        <label>Lesson Response Title</label>
                                        <input type='text' placeholder='Enter Lesson Title' value={lessonTitle} onChange={handleTitleChange} />
                                        {lessonTitleError && <p className='error-message'>{lessonTitleError}</p>}
                                    </div>
                                    <div>
                                        <label>Lesson Response Description</label>
                                        <textarea placeholder='Enter Lesson Description' value={lessonDescription} onChange={handleDescriptionChange} />
                                        {lessonDescriptionError && <p className='error-message'>{lessonDescriptionError}</p>}
                                    </div>
                                </form>
                            </div>

                            <div className="add-response-content-icon-item-container">
                                <a className={`icons ${formType === 'text' ? 'active' : ''}`} onClick={() => handleIconListClick('text')}><FontAwesomeIcon icon={faAlignJustify} /></a>
                                <a className={`icons ${formType === 'videos' ? 'active' : ''}`} onClick={() => handleIconListClick('videos')}><FontAwesomeIcon icon={faVideo} /></a>
                                <a className={`icons ${formType === 'images' ? 'active' : ''}`} onClick={() => handleIconListClick('images')}><FontAwesomeIcon icon={faImage} /></a>
                                <a className={`icons ${formType === 'audios' ? 'active' : ''}`} onClick={() => handleIconListClick('audios')}><FontAwesomeIcon icon={faMicrophone} /></a>
                                <a className={`icons ${formType === 'links' ? 'active' : ''}`} onClick={() => handleIconListClick('links')}><FontAwesomeIcon icon={faLink} /></a>
                            </div>

                            <div className="add-res-resources-container">
                                {renderContentForm(formType)}
                            </div>

                            <div className="challenge-details-form-container">
                                <form className='challenge-details-form'>
                                    <div>
                                        <label>Lesson Response Tags</label>
                                        <input value={formatTags} placeholder="Enter challenge tags, separated by commas" type="text" onChange={handleTagsChange} />
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="challenge-card">
                            <div className="challenge-card-details">
                                <p style={{ width: "10rem" }} className="challenge-card-content">Challenge not found</p>
                            </div>
                            <p className="note-to-responder">
                                Your response to a challenge can include a variety of formats such as text notes, videos, images, audio recordings, and links. Combine and match these formats to provide a comprehensive and effective lesson that best suits the nature of the challenge.
                            </p>
                        </div>
                    )}

                </div>
                <div className="bottom-bar"></div>
            </div>

            <div className='left-side'>
                <div className="response-main-preview-container">
                    {lessonTitle && <h2 className='lesson-title'>{capitalize(lessonTitle)}</h2>}
                    {lessonDescription && <p className='lesson-description'>{lessonDescription}</p>}
                    {blocks.map((block, index) => (
                        <div key={index} className='added-content-container' onClick={() => handleBlockClick(block.type, index)}>
                            <p className="added-content-value">{block.content}</p>
                        </div>
                    ))}
                    {lessonTags.length > 0 && (
                        <div className='lesson-tags'>
                            <p className='tag-title'>Tags:</p>
                            <div className='tags-content'>
                                {lessonTags.map((tag, index) =>
                                    tag !== "" && <span key={index}>{tag}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className='save-btn-container'>
                    <button className="btn save-challenge-btn" onClick={saveLessonResponse}>Save</button>
                    <Link to="/challenges">
                        <button className='btn cancel-challenge-btn'>Cancel</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ChallengeResponsePage;

