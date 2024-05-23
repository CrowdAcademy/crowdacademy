import React, { useEffect, useState } from 'react';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import Question from "../../components/question";
import CountHeader from '../../components/shared/CountHeader';

function InstructorHomePage() {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/challenges/')
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
            })
            .catch(error => {
                setError('Error fetching questions');
                console.error('Error:', error);
            });
    }, []);

    const QuestionElements = questions.map(question => (
        <Question
            key={question._id.$oid}
            id={question._id.$oid}
            title={question.title}
            description={question.description}
            createdAt={question.created_at.$date}
            author={question.author_username}
            image={question.author_avatar || ""}
        />
    ));

    return (
        <LeftMainContainer>
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                <>
                    <CountHeader name="Questions" count={questions.length} />
                    {QuestionElements}
                </>
            )}
        </LeftMainContainer>
    );
}

export default InstructorHomePage;
