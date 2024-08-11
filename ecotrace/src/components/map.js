import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import api from '../api';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';



const containerStyle = {
  width: 'calc(100% - 40px)', // Adjust width to account for padding
  height: '360px' // Adjust height to account for padding
};



const defaultCenter = { lat: 37.773972, lng: -122.431297 };



const mapOptions = {
  disableDefaultUI: true, // Disable default map UI to give a cleaner look
  zoomControl: true, // Enable zoom control
};

const circleOptions = (pollutionLevel) => ({
  strokeColor: pollutionLevel > 50 ? '#940000' : '#B6A100',
  strokeOpacity: 0.6,
  strokeWeight: 2,
  fillColor: pollutionLevel > 50 ? '#EE3F42' : '#FFBF40',
  fillOpacity: 0.3,
  radius: pollutionLevel * 10 // Adjust radius based on pollution level
});

const MapComponent = () => {
  const [environmentalData, setEnvironmentalData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [currentUser, setCurrentUser] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [message, setMessage] = useState('');
const [showMessage, setShowMessage] = useState(false);

  



useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    console.log('Decoded Token:', decoded);
    setCurrentUser(decoded.id); // Assuming 'userId' is included in the token payload
  }
    const fetchData = async () => {
      try {
        const { data } = await api.get('/environmental/data', {
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
        setMapLoaded(true);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  

  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/environmental/data/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEnvironmentalData(environmentalData.filter(item => item._id !== id));
      setSelectedData(null);
      setMessage('Data successfully deleted.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error('Failed to delete data:', error);
      setMessage('Failed to delete data.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };


  const handleLoad = () => setMapLoaded(true);

  return (
    
    <div style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.4) 100%),linear-gradient(0deg, #FFFFFF 0%, #FFFFFF 100%)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', padding: '20px' }}>
      {showMessage && (
      <div className="alert alert-success" role="alert" style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000 }}>
        {message}
      </div>
    )}
      <span style={{
          padding: '20px',  // Padding around the map
          marginleft: '10px',   // Margin around the map container
          
        }} className="text-[#000000] text-[32px] font-['Source_Serif_4'] font-medium col-span-1 font-bold">Nearby Flags</span>
      <p style={{
          padding: '20px',  // Padding around the map
          marginleft: '10px',   // Margin around the map container
          
        }} className="text-[#071108] text-xl font-['Work_Sans'] col-span-3">Areas of caution are displayed on the map based on previous flags.</p>
      
      <div style={{
          padding: '20px',  // Padding around the map
          marginleft: '10px',   // Margin around the map container
        }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={mapOptions}
          onLoad={handleLoad}
        >

        {mapLoaded && environmentalData.map(data => {
          console.log("Rendering marker and circle for:", data); // Verify that this runs
          return (
            <Marker
              key={data._id}
              position={{ lat: data.location.latitude, lng: data.location.longitude }}
              onClick={() => setSelectedData(data)}
            >
              <Circle
                center={{ lat: data.location.latitude, lng: data.location.longitude }}
                options={circleOptions(data.pollutionLevel)}
              />
            </Marker>
          );
        })}
          {selectedData && (
            <InfoWindow
              position={{ lat: selectedData.location.latitude, lng: selectedData.location.longitude }}
              onCloseClick={() => setSelectedData(null)}
            >
              <div className="flex justify-start items-start flex-col gap-[13px] py-[26px] px-[19px] border-solid border-[#525252] border rounded-[20px] col-span-1" style={{ background: 'linear-gradient(180deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.41) 100%),linear-gradient(0deg, #000000 0%, #000000 100%)', maxWidth: '300px' }}>
                <h3 style={{ color: '#FF6347', fontWeight: 'bold' }}>{selectedData.type || 'Environmental Data'}</h3>
                <p className="text-[#FFFFFF] text-[15px] font-['Work_Sans'] font-medium tracking-[-0.15px]">Pollution Level: {selectedData.pollutionLevel}</p>
                <p className="text-[#FFFFFF] text-[15px] font-['Work_Sans'] font-medium tracking-[-0.15px]">Temperature: {selectedData.temperature}°C</p>
                <p className="text-[#FFFFFF] text-[15px] font-['Work_Sans'] font-medium tracking-[-0.15px]">Date Recorded: {new Date(selectedData.dateRecorded).toLocaleDateString()}</p>
                {selectedData.userId === currentUser && (
                  <>
                <Button variant="danger" onClick={() => handleDelete(selectedData._id)}>Delete</Button>
                </>
                )}
            </div>

            </InfoWindow>
          )}
        </GoogleMap>
        
      </div>
    </div>
    
  );
};

export default MapComponent;
