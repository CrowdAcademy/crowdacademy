import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './lesson.css';
import { AnswerData } from '../../db/sampleAnswers';
import CloudinaryVideo from './CloudinaryVideo';

function LessonPage() {
    const { slug } = useParams();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        const foundLesson = AnswerData.find((question) => question.slug === slug);
        if (foundLesson) {
            setLesson(foundLesson);
        } else {
            console.error('Lesson not found');
        }
    }, [slug]);

    const handleProposeSolution = () => {
        // Implement logic for proposing alternative solution
        // For example, open a chatbot interface
        console.log('Propose alternative solution clicked');
    };

    return (
        <div className="lesson-container">
            {lesson ? (
                <div className="lesson-content">
                    <div className="lesson-header">
                        <h1>{lesson.content}</h1>
                        <p>Date: {lesson.date}</p>
                        <p>Author: {lesson.author}</p>
                        <div className="lesson-details">
                            {/* Decide if the lesson is paid or free */}
                            {lesson.isPaid ? (
                                <p className="paid-lesson">Paid Lesson</p>
                            ) : (
                                <p className="free-lesson">Free Lesson</p>
                            )}
                        </div>
                    </div>
                    <div className="lesson-body">
                        {/* Display YouTube video for streaming the lesson */}
                        <div className="lesson-video">
                            <CloudinaryVideo publicId="your_public_id_here" width={640} height={360} />
                        </div>
                        <div className="lesson-notes">
                            <h2>Lesson Notes:</h2>
                            <div>
                                {lesson.detailedContent.split('\n').map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className={index % 2 === 0 ? 'even-paragraph' : 'odd-paragraph'}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                            {/* Button to propose an alternative solution */}
                            <div className='alternative-solution-btn-container'>
                            <button onClick={handleProposeSolution} className="propose-solution-button">
                                Propose Alternative Solution
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default LessonPage;
