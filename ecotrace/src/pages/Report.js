import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745, // Default center can be your choice
  lng: -38.523
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
    <div className="container px-4 py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Report an Environmental Issue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={reportData.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Address</label>
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
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="p-2 border border-gray-300"
              accept="image/*"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Videos</label>
            <input
              type="file"
              name="videos"
              multiple
              onChange={handleChange}
              className="p-2 border border-gray-300"
              accept="video/*"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white transition bg-green-600 rounded-md hover:bg-green-700"
            >
              Submit Report
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Report;
