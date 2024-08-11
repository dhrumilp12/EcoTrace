import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
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
      width: '100%', // Full-width container
      maxWidth: '600px',
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
        width: '100%', // Full-width button
        maxWidth: '600px', // Ensure the button is at least 200px wide
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
    },
    error: {
        color: 'red',
        fontSize: '0.8rem'
      },
  };

  

const EnvironmentalForm = () => {
  const [locationError, setLocationError] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const initialValues = {
    dateRecorded: '',
    pollutionLevel: '',
    temperature: '',
    address: '', // User enters address here
    latitude: '', // Automatically filled after geocoding
    longitude: '',
    type: ''
  };

  const validationSchema = Yup.object().shape({
    dateRecorded: Yup.date().required('Date is required'),
    pollutionLevel: Yup.number().required('Pollution level is required').min(0, 'Pollution level must be positive'),
    temperature: Yup.number().required('Temperature is required'),
    address: Yup.string().required('Address is required'),
    latitude: Yup.number().required('Latitude is required').min(-90, 'Minimum latitude is -90').max(90, 'Maximum latitude is 90'),
    longitude: Yup.number().required('Longitude is required').min(-180, 'Minimum longitude is -180').max(180, 'Maximum longitude is 180'),
    type: Yup.string().required('Type is required')
  });

  const handleGeocode = async (address, setFieldValue) => {
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Ensure this is stored securely and not exposed
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
      if (response.data.results.length) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setFieldValue('latitude', lat);
        setFieldValue('longitude', lng);
      } else {
        setLocationError('Unable to find location for the given address.');
      }
    } catch (error) {
      console.error('Geocode error:', error);
      setLocationError('Error fetching location details.');
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/environmental/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
        
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      setMessage('Data submitted successfully');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setMessage('Failed to submit data.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto pb-20">
    <Header />
    <div>
      <h1 style={styles.title}>Submit Environmental Data</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form style={styles.form}>
            <div style={styles.container}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Date Recorded:</label>
              <Field type="date" name="dateRecorded" style={styles.input} />
              <ErrorMessage name="dateRecorded" component="div" style={styles.error} />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Pollution Level:</label>
              <Field type="number" name="pollutionLevel" placeholder="Pollution Level" style={styles.input} />
              <ErrorMessage name="pollutionLevel" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Temperature:</label>
              <Field type="number" name="temperature" placeholder="Temperature" style={styles.input} />
              <ErrorMessage name="temperature" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Address:</label>
              <Field type="text" name="address" placeholder="Enter address" style={styles.input} onBlur={(e) => handleGeocode(e.target.value, setFieldValue)} />
              <ErrorMessage name="address" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Latitude:</label>
              <Field type="number" name="latitude" placeholder="Latitude" readOnly style={styles.input} />
              <ErrorMessage name="latitude" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Longitude:</label>
              <Field type="number" name="longitude" placeholder="Longitude" readOnly style={styles.input} />
              <ErrorMessage name="longitude" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Type of Data:</label>
              <Field as="select" name="type" style={styles.input}>
            <option value="">Select Type</option>
            <option value="Air Quality">Air Quality</option>
            <option value="Water Pollution">Water Pollution</option>
            <option value="Noise Levels">Noise Levels</option>
            <option value="Land Pollution">Land Pollution</option>
            <option value="Other">Other</option>
            </Field>

            </div>
            </div>
            <div className="flex justify-end">
            <button type="submit" disabled={isSubmitting} style={styles.button}>
              Submit
            </button>
            </div>
          </Form>
        )}
      </Formik>
      {showMessage && (
        <div className="alert alert-success" role="alert" style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000 }}>
          {message}
        </div>
      )}
      {locationError && <div style={styles.message}>{locationError}</div>}
    </div>
    </div>
  );
};


export default EnvironmentalForm;
