import "./QuestionDetailsPage.css"
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import avatarDefault from "../../assets/avatar-default.svg";
import { useUser } from '../../context/UserContext';

const QuestionDetailsPage = () => {
    const { slug } = useParams();
    const { user, loading: userLoading } = useUser(); // Use userLoading from useUser hook
    const [question, setQuestion] = useState(null);
    const [message, setMessage] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuestion = async () => {
            if (token) {
                try {
                    const response = await fetch(`/challenges/${slug}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log("data: ", data);
                        setQuestion(data);
                        setMessage({ type: 'success', content: 'Question fetched successfully!' });
                    } else {
                        const errorData = await response.json();
                        setMessage({ type: 'error', content: errorData.message || 'Failed to fetch question.' });
                        console.log("Error Data: ", errorData);
                    }
                } catch (error) {
                    setMessage({ type: 'error', content: error.message });
                } finally {
                    // No need to setLoading(false) here
                    setTimeout(() => {
                        setMessage({});
                    }, 3000);
                }
            } else {
                console.log('No token found');
                // No need to setLoading(false) here
            }
        };

        fetchQuestion();
    }, [slug, token]);

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
                userLoading ? (
                    <p>Loading...</p>
                ) : (
                    question ? (
                        <div className="question-details-container">
                            <div className="question-details">
                                <h2>{question.title}</h2>
                                <p className="question-description">{question.description}</p>

                                <div className="question-meta">
                                    <div className="author-details">
                                        {
                                            question.author_avatar ? (
                                                <div className="author-avatar">
                                                    <img src={question.author_avatar} alt="Author Avatar" />
                                                </div>
                                            ) : (
                                                <div className="author-avatar">
                                                    <img src={avatarDefault} alt="Default Avatar" />
                                                </div>
                                            )
                                        }
                                        <p><strong>Author:</strong> {question.author_username}</p>
                                        <p><strong>Created At:</strong> {new Date(question.created_at.$date).toLocaleDateString()}</p>
                                    </div>
                                    {
                                        user && user.permissions.includes("create_lesson") && (
                                            <Link to={`/respond/${question._id.$oid}`}>
                                                <button className="respond-btn">Respond</button>
                                            </Link>
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                    ) : (
                        <p>No Question Found</p>
                    )
                )
            }
        </LeftMainContainer>
    );
};

export default QuestionDetailsPage;
