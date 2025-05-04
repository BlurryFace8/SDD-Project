import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TourListingsPage = () => {
    const { listingId } = useParams(); // Get listingId from URL

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tours/${listingId}`); // Update path if needed
                setListing(response.data.listing || null);
                console.log(response.data.listing)
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching listings');
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center bg-gray-100">
                <div className="bg-white p-6 rounded-xl shadow-md text-red-600 font-medium">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {listing.title}
                </h1>

                {/* // show images here */}
                {listing.images && listing.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {listing.images.map((image, index) => (
                            <img
                                key={index}
                                src={`http://localhost:3000/${image}`} // adjust domain as needed
                                alt={`Tour image ${index + 1}`}
                                className="w-full h-64 object-cover rounded-xl shadow-md"
                            />
                        ))}
                    </div>
                )}

                <div className="space-y-4 text-gray-700">
                    <p>
                        <span className="font-semibold">📍 Location:</span> {listing.location}
                    </p>
                    <p>
                        <span className="font-semibold">📞 Phone No:</span> {listing.guideId.phoneNum}
                    </p>
                    <p>
                        <span className="font-semibold">🧑 Contact person:</span> {listing.guideId.username}
                    </p>
                    <p>
                        <span className="font-semibold">💰 Price:</span> Rs. {listing.price}
                    </p>
                    <p>
                        <span className="font-semibold">📝 Description:</span>
                        <span className="block mt-1 text-gray-600">{listing.description}</span>
                    </p>
                    {listing.datesAvailable && listing.datesAvailable.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Dates</h2>
                            <ul className="space-y-2">
                                {listing.datesAvailable.map((date, index) => {
                                    const formattedDate = new Date(date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    });

                                    return (
                                        <li key={index} className="text-gray-700">
                                            {formattedDate}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Optional image display */}
                {listing.image && (
                    <div className="mt-6">
                        <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-64 object-cover rounded-xl shadow-md"
                        />
                    </div>
                )}

                {/* Back button (optional) */}
                <div className="mt-8 text-center">
                    <a
                        href="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                        ← Back to Listings
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TourListingsPage;
