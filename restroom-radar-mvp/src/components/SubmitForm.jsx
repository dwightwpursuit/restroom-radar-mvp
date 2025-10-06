import { useState } from 'react';

function SubmitForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    cleanliness: '3',
    status: 'Open',
    accessible: false,
    genderNeutral: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that we have required fields
    if (!formData.name || !formData.latitude || !formData.longitude) {
      alert('Please fill in all required fields!');
      return;
    }

    // Create new restroom object
    const newRestroom = {
      id: Date.now(), // Simple ID using timestamp
      name: formData.name,
      address: formData.address,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      cleanliness: parseInt(formData.cleanliness),
      status: formData.status,
      accessible: formData.accessible,
      genderNeutral: formData.genderNeutral,
      timestamp: new Date().toISOString()
    };

    // Send to parent component
    onSubmit(newRestroom);

    // Reset form
    setFormData({
      name: '',
      address: '',
      latitude: '',
      longitude: '',
      cleanliness: '3',
      status: 'Open',
      accessible: false,
      genderNeutral: false
    });

    alert('Restroom added successfully! 🎉');
  };

  return (
    <div className="submit-form">
      <h2>Add a Restroom</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Location Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Bryant Park Public Restroom"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Street Address (optional)</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="e.g., 42nd St & Broadway, New York, NY"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="latitude">Latitude *</label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="40.7580"
              step="0.000001"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="longitude">Longitude *</label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="-73.9855"
              step="0.000001"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cleanliness">Cleanliness Rating</label>
          <select
            id="cleanliness"
            name="cleanliness"
            value={formData.cleanliness}
            onChange={handleChange}
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Restricted">Restricted Access</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="accessible"
              checked={formData.accessible}
              onChange={handleChange}
            />
            Wheelchair Accessible
          </label>

          <label>
            <input
              type="checkbox"
              name="genderNeutral"
              checked={formData.genderNeutral}
              onChange={handleChange}
            />
            Gender Neutral
          </label>
        </div>

        <button type="submit" className="submit-button">
          Submit Restroom
        </button>
      </form>

      <div className="helper-text">
        <p><strong>Need coordinates?</strong> Right-click on Google Maps and copy the numbers that appear.</p>
      </div>
    </div>
  );
}

export default SubmitForm;