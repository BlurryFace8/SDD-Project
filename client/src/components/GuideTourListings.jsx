import axios from "axios";
import { useEffect, useState } from "react";

export const GuideTourListings = ({ guideId }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getTourListingsByGuideID = async (guideId) => {
      const res = await axios.get(
        `http://localhost:3000/api/tours/guide/${guideId}`
      );
      if (res.data?.listings) {
        setListings(res.data?.listings || []);
      }
    };

    if (guideId) {
      getTourListingsByGuideID(guideId);
    }
  }, [guideId]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
      {listings.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={
              item.images?.[0]
                ? `http://localhost:3000/${item.images[0]}`
                : "https://i.pinimg.com/736x/a7/3c/bf/a73cbfbcf18054bf31ee42e6453c5d94.jpg"
            }
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.location}</p>
            <p className="mt-2 text-gray-600 line-clamp-2">
              {item.description}
            </p>
            <p className="text-gray-600">{item.price}</p>
            <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
              View Listing
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
