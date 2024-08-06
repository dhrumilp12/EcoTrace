import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from '../components/Header';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px' // Match the rounding of other inputs
};

const center = {
  lat: -3.745, // Default center can be your choice
  lng: -38.523
};

const styles = {
  container: {
    padding: '30px',
    margin: 'auto',
    minWidth: '600px',
    background: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%), linear-gradient(0deg, #060D07 0%, #060D07 100%)',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
},
  title: {
      textAlign: 'center',
      color: '#F7F7F7',
      fontSize: '30px',
      fontWeight: 'medium',
      marginBottom: '20px',
      padding: '10px',
      background: '#071108',
      borderRadius: '12px', // Consistent rounding with container
      maxWidth: '600px', // Ensure the title is at least 200px wide
      margin: '20px auto', // Center the title
  },
  form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px', // Space between input groups
},
  label: {
      fontSize: '18px',
      color: '#F7F7F7',
      font: 'sans-serif',
      fontWeight: '500',
      marginBottom: '8px', // Space between label and input
      textAlign: 'center', // Center the label text
      width: '100%', // Make label take full width of its container
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    fontSize: '16px',
    width: '100%', // Full-width inputs
},
textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    height: '150px',
    fontSize: '16px',
    width: '100%',
},
fileInput: {
  display: 'none', // Hide the actual input element
},
fileLabel: {
  padding: '12px',
  border: '2px solid #ccc',
  borderRadius: '8px',
  display: 'block',
  cursor: 'pointer',
  color: '#F7F7F7',
  backgroundColor: '#071108',
  textAlign: 'center',
  width: '100%',
},
fileName: {
  marginTop: '5px',
  color: '#F7F7F7', // Ensure file name is visible
},
  button: {
      padding: '12px 25px',
      marginTop: '10px',
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.72) 100%),linear-gradient(0deg, #E1E0EC 0%, #E1E0EC 100%)',
      color: '#071108',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
      minWidth: '600px', // Ensure the button is at least 200px wide
      margin: 'auto', // Center the button
  },
  message: {
      marginTop: '20px',
      padding: '15px',
      borderRadius: '8px',
      background: '#4CAF50',
      color: 'white',
      textAlign: 'center',
      fontSize: '16px',
  }
};



const Report = () => {
  const [reportData, setReportData] = useState({
    description: '',
    address: '',
    latitude: null,
    longitude: null,
    images: [],
    videos: []
  });
  const [message, setMessage] = useState('');
  const [map, setMap] = useState(center);

  useEffect(() => {
    if (reportData.address) {
      handleGeocode(reportData.address);
    }
  }, [reportData.address]); // Call handleGeocode whenever the address changes

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
        const fileList = Array.from(files);  // Convert FileList to Array
        console.log('Files selected:', fileList);  // Check if files are captured correctly
        setReportData(prevData => ({
            ...prevData,
            [name]: fileList  // Store the file array
        }));
    } else {
        setReportData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
};



  const handleGeocode = async (address) => {
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
      if (response.data.results.length) {
        const { lat, lng } = response.data.results[0].geometry.location;
        console.log('Geocode success:', lat, lng);
        setMap({ lat, lng }); // Update map center
        setReportData(prevData => ({
          ...prevData,
          latitude: lat,
          longitude: lng
        }));
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', reportData.description);
    formData.append('longitude', reportData.longitude);
    formData.append('latitude', reportData.latitude);
    // Append each file correctly
    console.log('IMAGES' , reportData.images);  // This should log the FileList object
    if (reportData.images && reportData.images.length > 0) {
      Array.from(reportData.images).forEach(file => {
          formData.append('images', file);
          console.log('Appending file:', file.name);
      });
  } else {
      console.log('No images to upload.');
  }

  Array.from(reportData.videos).forEach(file => {
      formData.append('videos', file);
  });

  // Log FormData for debugging
  for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }

    try {
        const response = await axios.post('/reports', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        setMessage('Report submitted successfully');
        console.log('Report submitted successfully:', response.data);
    } catch (error) {
        setMessage('Error submitting report');
        console.error('Error submitting report:', error.response.data);
    }
};


  return (
  
      
    <div className="container px-4 py-8 mx-auto pb-20">
    <Header />
    <div >
            
            <h2 style={styles.title}>Report an Environmental Issue</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.container}>
        <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={reportData.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              value={reportData.address}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={map}
                zoom={15}
              >
                {map && <Marker key={`${map.lat}-${map.lng}`} position={map} />}
              </GoogleMap>
            </LoadScript>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="p-2 border border-gray-300 bg-gray-100 rounded-md"
              accept="image/*"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Videos</label>
            <input
              type="file"
              name="videos"
              multiple
              onChange={handleChange}
              className="p-2 border border-gray-300 bg-gray-100 rounded-md"
              accept="video/*"
            />
          </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              style={styles.button}
            >
              Submit Report
            </button>
          </div>
        </form>
        {message && <p  style={styles.message}>{message}</p>}
      </div>
    </div>
    
  );
};

export default Report;
