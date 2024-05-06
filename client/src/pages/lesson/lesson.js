import React, { useState, useEffect } from 'react';
import './lesson.css'; // Import the lesson CSS file
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import { AnswerData } from '../../db/sampleAnswers'; // Import the sampleAnswers data

function LessonPage() {
    const { slug } = useParams(); // Get the slug parameter from the URL
    const [lesson, setLesson] = useState(null);

    // Simulate fetching lesson data based on the slug
    useEffect(() => {
        // Find the lesson data from AnswerData based on the slug
        const foundLesson = AnswerData.find(question => question.slug === slug);
        if (foundLesson) {
            setLesson(foundLesson);
        } else {
            console.error('Lesson not found');
        }
    }, [slug]); // Fetch data whenever the slug changes

    return (
        <div className="lesson-container">
            {lesson ? (
                <div className="lesson-content">
                    <h1>{lesson.content}</h1>
                    <p>Date: {lesson.date}</p>
                    <p>Author: {lesson.author}</p>
                    <div>
                        {/* Display detailedContent with paragraphs */}
                        <h2>Lesson Notes:</h2>
                        {lesson.detailedContent.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    {/* Render other lesson details here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default LessonPage;
