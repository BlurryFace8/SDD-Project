import React, { useState } from 'react';
import axios from 'axios';

const CreateListing = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [guideId, setGuideId] = useState('');
  const [datesAvailable, setDatesAvailable] = useState('');
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      title,
      location,
      description,
      price,
      guideId,
      images,
      datesAvailable,
    })

    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('guideId', guideId);

    // Convert datesAvailable to a comma-separated string
    if (datesAvailable) {
      formData.append('datesAvailable', datesAvailable.split(',').join(','));
    } else {
      setErrorMessage('Dates Available is required');
      return;
    }

    // Append images to FormData
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/tours/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Listing created:', response.data);
    } catch (error) {
      console.error('Error creating listing:', error);
      setErrorMessage('Failed to create listing: ' + error.message);
    }
  };

  // Handle file selection
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  return (
    <div>
      <h2>Create Tour Listing</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="guideId">Guide ID</label>
          <input
            type="text"
            id="guideId"
            value={guideId}
            onChange={(e) => setGuideId(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="datesAvailable">Dates Available</label>
          <input
            type="text"
            id="datesAvailable"
            value={datesAvailable}
            onChange={(e) => setDatesAvailable(e.target.value)}
            placeholder="Enter dates as comma-separated values (e.g., 2025-05-01, 2025-05-15)"
            required
          />
        </div>

        <div>
          <label htmlFor="images">Upload Images</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <button type="submit">Create Listing</button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
