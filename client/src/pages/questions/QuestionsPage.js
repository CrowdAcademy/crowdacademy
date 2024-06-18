import "../../assets/messages.css";
import "./question.css";
import React, { useEffect, useState } from 'react';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import Question from "../../components/question/question";
import CountHeader from '../../components/shared/CountHeader';

const InstructorHomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchChallenges = async () => {
            if (token) {
                try {
                    const response = await fetch('/challenges/', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log("data: ", data);
                        if (data.length === 0) {
                            setMessage({ type: 'info', content: 'No Questions Found' });
                        } else {
                            setQuestions(data);
                            setMessage({ type: 'success', content: 'Challenges fetched successfully!' });
                        }
                    } else {
                        setMessage({ type: 'error', content: 'Failed to fetch challenges.' });
                        const data = await response.json();
                        console.log("Data: ", data);
                    }
                } catch (error) {
                    setMessage({ type: 'error', content: error.message });
                } finally {
                    setLoading(false);
                    setTimeout(() => {
                        setMessage({});
                    }, 3000);
                }
            } else {
                console.log('No token found');
                setLoading(false);
            }
        };

        fetchChallenges();
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
            {
                Object.keys(message).length !== 0 && (
                    <div className={`message-div ${message.type}`}>
                        <p>{message.content}</p>
                    </div>
                )
            }
            {
                loading ?
                    (
                        <p>Loading...</p>
                    ) : (
                        questions.length === 0 ? (
                            <p>No Questions Found</p>
                        ) : (
                            <>
                                <CountHeader name="Questions" count={questions.length} />
                                {QuestionElements}
                            </>
                        )
                    )
            }
        </LeftMainContainer>
    );
};

export default InstructorHomePage;
