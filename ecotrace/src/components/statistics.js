import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnvironmentalStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/environmental/statistics`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setStats([{
                    ...data,
                    name: "Environmental Stats" // Dummy name key for XAxis
                }]); // Convert stats to array for recharts and add name key for XAxis
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <p>Loading statistics...</p>;
    if (error) return <p>Error loading statistics: {error}</p>;

    return (
        <div style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.4) 100%),linear-gradient(0deg, #FFFFFF 0%, #FFFFFF 100%)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', padding: '20px' , marginTop: '25px'}}>
            <h2 style={{
          padding: '20px',  // Padding around the map
          marginleft: '10px',   // Margin around the map container
          
        }} className="text-[#000000] text-[32px] font-['Source_Serif_4'] font-medium col-span-1 font-bold">Environmental Statistics</h2>
            {stats ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [`${value.toFixed(2)}`, name]} />
                        <Legend />
                        <Bar dataKey="averagePollution" fill="#82ca9d" name="Avg Pollution Level" />
                        <Bar dataKey="maxTemperature" fill="#8884d8" name="Max Temperature" />
                        <Bar dataKey="minTemperature" fill="#ffc658" name="Min Temperature" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>No statistics available.</p>
            )}
        </div>
    );
};

export default EnvironmentalStats;