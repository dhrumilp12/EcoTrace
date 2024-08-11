import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import api from '../api';

const containerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '8px'
};

const GetReports = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/reports', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                
                const updatedReports = response.data.map(report => ({
                    ...report,
                    showMap: false
                  }));
                console.log(response.data);
                response.data.forEach(report => {
                    reverseGeocode(report.location.coordinates);
                });
                setReports(updatedReports);
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
    const handleToggleMap = (reportId) => {
        setReports(prevReports =>
          prevReports.map(report =>
            report._id === reportId ? { ...report, showMap: !report.showMap } : report
          )
        );
      };

    if (isLoading) return <p>Loading reports...</p>;
    if (error) return <p>Error loading reports: {error}</p>;

    return (
        <div className="container px-2 py-4 mx-auto">
                  {reports.length > 0 ? (
                      reports.map((report) => (
                          <div key={report._id} className="p-4 bg-white rounded-md shadow m-4">
                              <h3 className="mb-2 text-xl font-semibold">{report.description}</h3>
                              <p className="mb-2 text-gray-500"><strong>Created At:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
                              <p className="mb-2 text-gray-500"><strong>Location:</strong> {report.address}</p>
                              <p className="mb-2 text-gray-500"><strong>Reported by:</strong> {report.userId.username || 'N/A'}</p>
                              <p className="mb-2 text-gray-500"><strong>User ID:</strong> {report.userId._id}</p>
                              <button 
                            onClick={() => handleToggleMap(report._id)}
                            className="mb-4 p-2 bg-green-600 text-white rounded-md hover:bg-gray-200 hover:bg-green-700"
                            >
                            {report.showMap ? 'Hide Map' : 'Show Map'}
                            </button>
                            {report.showMap && (
                              <div style={containerStyle} className="mb-4">
                                <GoogleMap
                                    mapContainerStyle={{ width: '100%', height: '100%', margin: '0 auto' }}
                                    center={{ lat: report.location.coordinates[1], lng: report.location.coordinates[0] }}
                                    zoom={15}
                                    onLoad={() => console.log('Map loaded:', report.location.coordinates)}
                                >
                                    <Marker 
                                        position={{ lat: report.location.coordinates[1], lng: report.location.coordinates[0] }}
                                        onLoad={() => console.log('Marker loaded:', report.location.coordinates)}
                                    />
                                </GoogleMap>
                              </div>)}
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
    );
};

export default GetReports;