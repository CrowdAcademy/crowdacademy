import "./ChallengeDetailsPage.css"
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import avatarDefault from "../../assets/avatar-default.svg";
import { useUser } from '../../context/UserContext';

const ChallengeDetailsPage = () => {
    const { slug } = useParams();
    const { user, loading: userLoading } = useUser(); // Use userLoading from useUser hook
    const [challenge, setChallenge] = useState(null);
    const [message, setMessage] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchChallenge = async () => {
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
                        setChallenge(data);
                        setMessage({ type: 'success', content: 'Challenge fetched successfully!' });
                    } else {
                        const errorData = await response.json();
                        setMessage({ type: 'error', content: errorData.message || 'Failed to fetch challenge.' });
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

        fetchChallenge();
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
                    challenge ? (
                        <div className="challenge-details-container">
                            <div className="challenge-details">
                                <h2>{challenge.title}</h2>
                                <p className="challenge-description">{challenge.description}</p>

                                <div className="challenge-meta">
                                    <div className="author-details">
                                        {
                                            challenge.author_avatar ? (
                                                <div className="author-avatar">
                                                    <img src={challenge.author_avatar} alt="Author Avatar" />
                                                </div>
                                            ) : (
                                                <div className="author-avatar">
                                                    <img src={avatarDefault} alt="Default Avatar" />
                                                </div>
                                            )
                                        }
                                        <p><strong>Author:</strong> {challenge.author_username}</p>
                                        <p><strong>Created At:</strong> {new Date(challenge.created_at.$date).toLocaleDateString()}</p>
                                    </div>
                                    {
                                        user && user.permissions.includes("create_lesson") && (
                                            <Link to={`/respond/${challenge._id.$oid}`}>
                                                <button className="respond-btn">Respond</button>
                                            </Link>
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                    ) : (
                        <p>No Challenge Found</p>
                    )
                )
            }
        </LeftMainContainer>
    );
};

export default ChallengeDetailsPage;
