import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch /members and setData to response
        fetch('/members')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setData(data.members);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>CrowdAcademy</h1>
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <ul>
                    {data.map((member, index) => (
                        <li key={index}>{member}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
