import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyStatsPage = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('/api/my-stats'); // Replace '/api/my-stats' with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch statistics data');
                }
                const data = await response.json();
                setStatistics(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!statistics) {
        return <div>Error fetching statistics data</div>;
    }

    return (
        <div>
            <h1>My Stats</h1>
            <p>Provide personalized statistics and insights about your activity on the platform.</p>

            
            <h2>Contribution History</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={statistics.contributionHistory}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

            
            <h2>Reputation Points: {statistics.reputationPoints}</h2>
            <h2>Badges Earned: {statistics.badgesEarned}</h2>

            
            <h2>Goal Setting</h2>
            <p>Track your progress over time and set goals to improve your performance.</p>
        
        </div>
    );
};

export default MyStatsPage;
