import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/bookings/user/${userId}`
        );
        setBookings(res.data);
      } catch (err) {
        setError("Failed to load bookings.");
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Bookings
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t made any bookings yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow rounded-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-1">
                {booking.tourListing?.title || "Tour Title"}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Location:{" "}
                <span className="font-medium">
                  {booking.tourListing?.location}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Date:{" "}
                {Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                }).format(new Date(booking.date))}
              </p>
              <p className="text-gray-600 text-sm">
                People: {booking.numPeople}
              </p>
              <p className="text-gray-600 text-sm font-bold">
                Total:{" "}
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })
                  .format(
                    (booking?.numPeople ?? 0) *
                      (booking.tourListing?.price ?? 0)
                  )
                  .replace("$", "Rs. ")}
              </p>
              {booking.message && (
                <p className="text-gray-600 text-sm mt-1 italic">
                  Message: "{booking.message}"
                </p>
              )}
              <p className="mt-3 text-sm font-medium">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-white capitalize ${
                    booking.status === "pending"
                      ? "bg-yellow-500"
                      : booking.status === "accepted"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Booked on: {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
