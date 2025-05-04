import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
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
      images,
      datesAvailable,
    })

    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('guideId', currentUser._id);

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
      navigate("/")
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

  return <div className="min-h-screen bg-blue-50 flex items-center justify-center py-10 px-4">
    <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Create Tour Listing</h2>

      {errorMessage && (
        <p className="text-red-600 font-semibold mb-4 text-center">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Dates Available */}
        <div>
          <label htmlFor="datesAvailable" className="block text-sm font-medium text-gray-700">
            Dates Available
          </label>
          <input
            type="text"
            id="datesAvailable"
            value={datesAvailable}
            onChange={(e) => setDatesAvailable(e.target.value)}
            placeholder="e.g., 2025-05-01, 2025-05-15"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Upload Images */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
            required
            className="mt-1 w-full text-gray-600"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  </div>
};

export default CreateListing;
