import './lesson.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CloudinaryVideo from './CloudinaryVideo';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import { useUser } from '../../context/UserContext';



function LessonPage() {
    const { slug } = useParams();
    const [lesson, setLesson] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { user, loading } = useUser();

    useEffect(() => {
        fetch(`/lessons/${slug}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 500) {
                        throw new Error('Internal Server Error');
                    }
                    return response.json().then(errorData => {
                        throw { status: response.status, data: errorData };
                    }).catch(() => {
                        throw { status: response.status, message: 'Invalid JSON response from server' };
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Lesson data:', data);
                setLesson(data);
            })
            .catch(error => {
                if (error.message === 'Internal Server Error') {
                    console.error('Error fetching lesson:', error);
                    setErrorMessage('The server is currently unavailable. Please try again later.');
                } else if (error.status) {
                    console.error('Error fetching lesson:', error);
                    setErrorMessage(`Error ${error.status}: ${error.data?.message || error.message}`);

                    if (error.status === 404) {
                        setErrorMessage('Lesson not found');
                    }

                } else if (error.message === 'Failed to fetch') {
                    console.error('Network error:', error);
                    setErrorMessage('Network error: Unable to reach the server. Please check your internet connection or try again later.');
                } else {
                    console.error('There was an error fetching the lesson!', error);
                    setErrorMessage('There was an error fetching the lesson!');
                }
            });
    }, [slug]);

    const handleProposeSolution = () => {
        console.log('Propose alternative solution clicked');
    };

    return (
        <LeftMainContainer>

            {loading ? <p>Loading...</p> : null}

            {lesson ? (
                <div className="lesson-content">
                    <div className="lesson-header">
                        <h1>{lesson.title}</h1>
                        <p className='lesson-details-description'>{lesson.description}</p>
                        <p>Date: {lesson.created_at.$date}</p>
                        <p>Author: {lesson.instructor_username}</p>
                        <div className="lesson-details">
                            {lesson.isPaid ? (
                                <p className="paid-lesson">Paid Lesson</p>
                            ) : (
                                <p className="free-lesson">Free Lesson</p>
                            )}
                        </div>
                    </div>
                    <div className="lesson-body">
                        <div className="lesson-video">
                            <CloudinaryVideo publicId="your_public_id_here" width={640} height={360} />
                        </div>
                        <div className="lesson-notes">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt quam lectus vel quam. Donec euismod, quam vel semper tincidunt, quam lectus tincidunt quam, euismod tincidunt</p>
                        </div>
                        <div className='alternative-solution-btn-container'>
                            <button onClick={handleProposeSolution} className="propose-solution-button">
                                Propose Alternative Solution
                            </button>

                            {user && lesson.instructor_id === user._id.$oid && (
                                <>
                                    <Link to={`/lessons/edit/${lesson._id}`}>
                                        <button className="btn primary lg">Edit Lesson</button>
                                    </Link>
                                    <button className="btn danger lg">Delete Lesson</button>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            ) : (
                errorMessage ? <div>
                    <p>{errorMessage}</p>
                    <Link to="/lessons">
                        <button className='btn ptn-secondary'>Back to Lessons</button>
                    </Link>
                </div> : <p>Loading...</p>
            )}
        </LeftMainContainer>
    );
}

export default LessonPage;
