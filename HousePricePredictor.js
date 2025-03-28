// src/components/HousePricePredictor.js
import React, { useState } from 'react';

const HousePricePredictor = () => {
  const [formData, setFormData] = useState({
    city: '',
    province: '',
    latitude: '',
    longitude: '',
    lease_term: '',
    type: '',
    beds: '',
    baths: '',
    sq_feet: '',
    furnishing: 'Unfurnished',
    smoking: 'No',
    pets: false,
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPredictedPrice(null);
    try {
      const response = await fetch('/predict_house_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setPredictedPrice(data.predicted_price);
      } else {
        setError(data.message || 'Prediction failed.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="province">Province</label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="lease_term">Lease Term</label>
          <input
            type="text"
            id="lease_term"
            name="lease_term"
            value={formData.lease_term}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="type">Type of House</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="beds">Number of Beds</label>
          <input
            type="number"
            id="beds"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="baths">Number of Baths</label>
          <input
            type="number"
            id="baths"
            name="baths"
            value={formData.baths}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="sq_feet">Square Feet</label>
          <input
            type="number"
            id="sq_feet"
            name="sq_feet"
            value={formData.sq_feet}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="furnishing">Furnishing</label>
          <select
            id="furnishing"
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="Unfurnished">Unfurnished</option>
            <option value="Partially Furnished">Partially Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="smoking">Smoking</label>
          <select
            id="smoking"
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div style={{...formGroupStyle, flexDirection: 'row', alignItems: 'center'}}>
          <input
            type="checkbox"
            id="pets"
            name="pets"
            checked={formData.pets}
            onChange={handleChange}
            style={{ marginRight: '8px' }}
          />
          <label htmlFor="pets" style={{ margin: 0 }}>Pets</label>
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={submitButtonStyle}>Predict Price</button>
      </form>
      {predictedPrice !== null && (
        <div style={resultStyle}>
          <strong>Predicted Rental Price:</strong> ${predictedPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
};

// Inline styles for HousePricePredictor component
const containerStyle = {
  maxWidth: '600px',
  padding: '24px',
  margin: '40px auto',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const submitButtonStyle = {
  backgroundColor: '#007BFF',
  color: '#fff',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const errorStyle = {
  color: 'red'
};

const resultStyle = {
  marginTop: '16px',
  backgroundColor: '#DFF0D8',
  border: '1px solid #3C763D',
  padding: '12px',
  borderRadius: '4px',
  fontWeight: 'bold'
};

export default HousePricePredictor;
