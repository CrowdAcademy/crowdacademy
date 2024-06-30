import "../../assets/messages.css";
import "./challenge.css";
import React, { useEffect, useState } from 'react';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import Challenge from "../../components/challenge/challenge";
import CountHeader from '../../components/shared/CountHeader';

const InstructorHomePage = () => {
    const [challenges, setChallenges] = useState([]);
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
                            setMessage({ type: 'info', content: 'No Challenges Found' });
                        } else {
                            setChallenges(data);
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

    const ChallengeElements = challenges.map(challenge => (
        <Challenge
            key={challenge._id.$oid}
            id={challenge._id.$oid}
            title={challenge.title}
            description={challenge.description}
            createdAt={challenge.created_at.$date}
            author={challenge.author_username}
            image={challenge.author_avatar || ""}
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
                        challenges.length === 0 ? (
                            <p>No Challenges Found</p>
                        ) : (
                            <>
                                <CountHeader name="Challenges" count={challenges.length} />
                                {ChallengeElements}
                            </>
                        )
                    )
            }
        </LeftMainContainer>
    );
};

export default InstructorHomePage;
