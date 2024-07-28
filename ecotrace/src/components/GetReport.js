import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '200px'
};

const GetReports = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/reports', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                
                setReports(response.data.map(report => ({
                  ...report,
                  address: 'Loading address...' // Initial placeholder for address
                })));
                console.log(response.data);
                response.data.forEach(report => {
                    reverseGeocode(report.location.coordinates);
                });
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    const reverseGeocode = async (coordinates) => {
        const [longitude, latitude] = coordinates;
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const address = response.data.results[0]?.formatted_address;
            setReports(prevReports => prevReports.map(report => 
              report.location.coordinates[0] === longitude && report.location.coordinates[1] === latitude
                ? { ...report, address } : report
            ));
        } catch (error) {
            console.error('Reverse geocoding error:', error);
        }
    };

    if (isLoading) return <p>Loading reports...</p>;
    if (error) return <p>Error loading reports: {error}</p>;

    return (
        <div className="container px-4 py-8 mx-auto">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  {reports.length > 0 ? (
                      reports.map((report) => (
                          <div key={report._id} className="p-4 bg-gray-100 rounded-md shadow">
                              <h3 className="mb-2 text-xl font-semibold">{report.description}</h3>
                              <p className="mb-2 text-gray-500"><strong>Created At:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
                              <p className="mb-2 text-gray-500"><strong>Location:</strong> {report.address}</p>
                              <p className="mb-2 text-gray-500"><strong>Reported by:</strong> {report.userId.username || 'N/A'}</p>
                              <p className="mb-2 text-gray-500"><strong>User ID:</strong> {report.userId._id}</p>
                              <div style={containerStyle} className="mb-4">
                                <GoogleMap
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                    center={{ lat: report.location.coordinates[1], lng: report.location.coordinates[0] }}
                                    zoom={15}
                                    onLoad={() => console.log('Map loaded:', report.location.coordinates)}
                                >
                                    <Marker 
                                        position={{ lat: report.location.coordinates[1], lng: report.location.coordinates[0] }}
                                        onLoad={() => console.log('Marker loaded:', report.location.coordinates)}
                                    />
                                </GoogleMap>
                              </div>
                              <div className="space-y-4">
                              {report.images && report.images.map((image, index) => (
                                  <img key={index} src={image} alt={`Report ${report._id}`} style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
                              ))}
                              {report.videos && report.videos.map((video, index) => (
                                  <video key={index} controls style={{ width: '100%', maxWidth: '600px' }}>
                                      <source src={video} type="video/mp4" />
                                      Your browser does not support the video tag.
                                  </video>
                              ))}
                                </div>
                              
                          </div>
                      ))
                  ) : (
                      <p>No reports found.</p>
                  )}
                </div>
            </LoadScript>
        </div>
    );
};

export default GetReports;