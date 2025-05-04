import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GuidePage = () => {
  const { guideId } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/guide/${guideId}`
        );
        setGuide(res.data.guide);
        setError("");
      } catch (err) {
        setError("Failed to load guide data.");
        setGuide(null);
      } finally {
        setLoading(false);
      }
    };
    fetchGuide();
  }, [guideId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold animate-pulse text-blue-600">
          Loading guide...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg font-medium">{error}</div>
      </div>
    );
  }

  const { user, travelPhotos, experience, description, createdAt } = guide;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Guide Profile</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Guide Information</h2>
        <p className="text-gray-700 mt-2">
          <strong>Username:</strong> {user?.username || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Phone No:</strong> {user?.phoneNum || "N/A"}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-gray-700 mt-2">
          {description || "No description provided."}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Experience</h2>
        <p className="text-gray-700 mt-2">
          {experience || "No experience info available."}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Travel Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {travelPhotos && travelPhotos.length > 0 ? (
            travelPhotos.map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:3000/${photo}`}
                alt={`Travel Photo ${index + 1}`}
                className="rounded-lg object-cover h-48 w-full"
              />
            ))
          ) : (
            <p className="text-gray-500">No photos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
