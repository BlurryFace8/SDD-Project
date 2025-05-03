import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [guides, setGuides] = useState([]);
  const [tourListings, setTourListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guidesRes, toursRes] = await Promise.all([
          axios.get('http://localhost:3000/api/guide/'),
          axios.get('http://localhost:3000/api/tours/')
        ]);

        setGuides(guidesRes.data?.guides || []);
        setTourListings(toursRes.data?.listings || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50">
      <header className=" py-6 ">
        <div className="container mx-auto px-6 text-center">
          <span className="text-4xl font-bold">Sherpa</span>
          <span className="text-4xl font-bold text-red-600">Dai</span>
          <p className="text-lg mt-2">
            Find the perfect guide for your next adventure
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {
            guides.map((guide, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={guide.user.avatar}
                  alt={guide.user.username}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{guide.user.username}</h3>
                  <p className="text-gray-600">
                    {guide.description}              </p>
                  <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                    View Profile
                  </button>
                </div>
              </div>
            ))
          }
        </div>

        <section className="container mx-auto px-6 py-12 mt-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Tour Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tourListings.map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    src={item.images?.[0] || "https://i.pinimg.com/736x/a7/3c/bf/a73cbfbcf18054bf31ee42e6453c5d94.jpg"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.location}
                    </p>
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-gray-600">
                      {item.price}
                    </p>
                    <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                      View Listing
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </section>
      </main>
    </div>
  );
}