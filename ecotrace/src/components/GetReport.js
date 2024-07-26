import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetReports = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
useEffect(() => {
    const fetchReports = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/reports', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("Reports data:", response.data); // Log to see the data
            setReports(response.data);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            console.error("Fetching error:", err);
        }
    };

    fetchReports();
}, []);

    if (isLoading) return <p>Loading reports...</p>;
    if (error) return <p>Error loading reports: {error}</p>;

    return (
        <div>
            <h2>Reports</h2>
            {reports.length > 0 ? (
                <div>
                    {reports.map((report) => (
                        <div key={report._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
                            <h3>{report.description}</h3>
                            <p><strong>Created At:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
                            <p><strong>Location:</strong> Latitude: {report.location.coordinates[1]}, Longitude: {report.location.coordinates[0]}</p>
                            {report.images && report.images.map((image, index) => (
                                <img key={index} src={image} alt={`Report ${report._id}`} style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
                            ))}

                            {report.videos && report.videos.map((video, index) => (
                                <video key={index} controls style={{ width: '100%', maxWidth: '600px' }}>
                                    <source src={video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ))}
                            <p><strong>User ID:</strong> {report.userId}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reports found.</p>
            )}
        </div>
    );
};

export default GetReports;
