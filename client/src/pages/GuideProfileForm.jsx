import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const GuideProfileForm = () => {
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [travelPhotos, setTravelPhotos] = useState([]);
  console.log({ travelPhotos });
  const { currentUser } = useSelector((state) => state.user);

  const userId = currentUser?._id;

  useEffect(() => {
    if (!userId) return;

    const getGuideById = async () => {
      const res = await axios.get(`http://localhost:3000/api/guide/${userId}`);
      const guide = res.data?.guide;
      if (guide) {
        setExperience(guide.experience);
        setDescription(guide.description);
        setPhotos(guide.travelPhotos);
      }
    };

    getGuideById();
  }, []);

  const handlePhotoChange = (e) => {
    setTravelPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("experience", experience);
    formData.append("description", description);

    [...travelPhotos, ...photos].forEach((photo) => {
      formData.append("travelPhotos", photo);
    });

    try {
      const res = await axios.patch(
        "http://localhost:3000/api/guide/upsert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setExperience(experience);
      setDescription(description);

      alert("Profile Created Successfully");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Error creating profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="guide-profile-form mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create Guide Profile</h2>

      <label className="block mb-1">Experience</label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
      />

      <label className="block mb-1">Description</label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label className="block mb-1">Travel Photos</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handlePhotoChange}
        className="mb-4"
      />

      {photos && photos.length > 0 ? (
        photos.map((photo, index) => (
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

      <button
        type="submit"
        className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default GuideProfileForm;
