import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = { lat: 37.773972, lng: -122.431297 };

const MapComponent = () => {
  const [environmentalData, setEnvironmentalData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/environmental/data', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEnvironmentalData(data);
        console.log(data);
        if (data.length > 0) {
          setCenter({
            lat: data[0].location.latitude,
            lng: data[0].location.longitude
          });
        }
        setMapLoaded(true); // Ensures that the map and data are ready
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLoad = () => setMapLoaded(true);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={handleLoad}
      >
        {mapLoaded && environmentalData.map(data => (
          <Marker
            key={data._id}
            position={{ lat: data.location.latitude, lng: data.location.longitude }}
            onClick={() => setSelectedData(data)}
          />
        ))}

        {selectedData && (
          <InfoWindow
            position={{ lat: selectedData.location.latitude, lng: selectedData.location.longitude }}
            onCloseClick={() => setSelectedData(null)}
          >
            <div>
              <h2>{selectedData.type || 'Environmental Data'}</h2>
              <p>Pollution Level: {selectedData.pollutionLevel}</p>
              <p>Temperature: {selectedData.temperature}°C</p>
              <p>Date Recorded: {new Date(selectedData.dateRecorded).toLocaleDateString()}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
