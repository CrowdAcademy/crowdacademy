import "./lessons.css";
import React, { useState, useEffect } from 'react';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import LessonCard from '../../components/LessonCard';
import CountHeader from "../../components/shared/CountHeader";

function LessonsPage() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLessons = async () => {
        try {
            const response = await fetch('/lessons');
            if (!response.ok) {
                throw new Error('Failed to fetch lessons');
            }
            const data = await response.json();
            console.log(data);
            setLessons(data);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    return (
        <LeftMainContainer>
            {loading ? (
                <p>Loading...</p>
            ) : (
                lessons.length === 0 ? (
                    <p>No lessons found.</p>
                ) : (
                    <>
                        <CountHeader name="Lessons" count={lessons.length} />
                        {lessons.map((lesson) => (
                            <LessonCard
                                key={lesson._id.$oid} // Assuming lesson._id.$oid is a unique identifier
                                id={lesson._id.$oid}
                                userId={lesson.instructor_username}
                                title={lesson.title}
                                description={lesson.description}
                                profilePhoto={lesson.instructor_avatar || ""}
                                fetchLessons={fetchLessons}
                            />
                        ))}
                    </>
                )
            )}
        </LeftMainContainer>
    );
}

export default LessonsPage;
