import "./answers.css";
import React, { useState, useEffect } from 'react';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import Answer from "../../components/Answer";
import CountHeader from "../../components/shared/CountHeader";


function AnswersPage() {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAnswers = async () => {
        try {
            const response = await fetch('/lessons');
            if (!response.ok) {
                throw new Error('Failed to fetch answers');
            }
            const data = await response.json();
            console.log(data);
            setAnswers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching answers:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnswers();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <LeftMainContainer>
            <CountHeader name="Answers" count={answers.length} />
            {answers.map((answer, index) => (
                <Answer
                    id={answer._id.$oid}
                    key={index}
                    userId={answer.instructor_username}
                    content={answer.title}
                    detailedContent={answer.description}
                    profilePhoto={answer.instructor_avatar || ""}
                    slug={answer.slug}
                    isPaid={answer.isPaid}
                    fetchAnswers={fetchAnswers}
                />
            ))}
        </LeftMainContainer>
    );
}

export default AnswersPage;
