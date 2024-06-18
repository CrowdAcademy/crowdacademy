import React, { useEffect, useState } from "react";
import LeftMainContainer from "../../../components/shared/leftmaincontainer";
import Question from "../../../components/question/question";
import CountHeader from "../../../components/shared/CountHeader";

function InstructorHomePage() {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    const refreshLessons = () => {
        const token = localStorage.getItem("token");
        const headers = new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });

        fetch("/challenges/", { headers })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setQuestions(data);
                } else {
                    setError(data.message);
                    setQuestions([]);
                    console.log(data);
                }
            })
            .catch((error) => {
                setError("Error fetching questions");
                console.error("Error:", error);
                setQuestions([]);
            }
        );
    };

    useEffect(() => { refreshLessons() }, []);

    const QuestionElements = Array.isArray(questions)
        ? questions.map((question) => (
            <Question
                key={question._id.$oid}
                id={question._id.$oid}
                title={question.title}
                description={question.description}
                createdAt={question.created_at.$date}
                author={question.author_username}
                image={question.author_avatar || ""}
                refreshLessons={refreshLessons}
            />
        ))
        : [];

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
