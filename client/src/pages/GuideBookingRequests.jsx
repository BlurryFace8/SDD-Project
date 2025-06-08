import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { GuideBookingRow } from "./GuideBookingRow";

const GuideBookingRequests = () => {
  const [bookings, setBookings] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const guideId = currentUser._id;

  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/bookings/guide/${guideId}`
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  }, [guideId]);

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Booking Requests
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No booking requests yet.</p>
        ) : (
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-100 text-blue-800 font-semibold">
                <tr>
                  <th className="px-4 py-3">Tour</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Tour Date</th>
                  <th className="px-4 py-3">People</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <GuideBookingRow
                    key={booking._id}
                    booking={booking}
                    fetchBookings={fetchBookings}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default GuideBookingRequests;
