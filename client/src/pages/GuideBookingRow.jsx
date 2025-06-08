import axios from "axios";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useSelector } from "react-redux";

export const GuideBookingRow = ({ booking, fetchBookings }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  const updateStatus = async (id, status) => {
    console.log("hello");
    try {
      await axios.patch(
        `http://localhost:3000/api/bookings/${currentUser._id}/status`,
        {
          bookingId: id,
          status,
        }
      );
      close();
      fetchBookings(); // refresh after update
    } catch (err) {
      console.error("Failed to update booking status", err);
    }
  };

  return (
    <>
      <tr key={booking._id} className="border-t">
        <td className="px-4 py-3">{booking.tourListing?.title}</td>
        <td className="px-4 py-3">{booking.user?.username}</td>
        <td className="px-4 py-3">
          {Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(new Date(booking.date))}
        </td>
        <td className="px-4 py-3">{booking.numPeople}</td>
        <td className="px-4 py-3">Rs. {booking.tourListing?.price}</td>
        <td className="px-4 py-3">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })
            .format(
              (booking.tourListing?.price ?? 0) * (booking?.numPeople ?? 0)
            )
            .replace("$", "Rs. ")}
        </td>
        <td className="px-4 py-3 text-sm">{booking.message || "-"}</td>
        <td className="px-4 py-3">
          <span
            className={`px-3 py-1 rounded-full text-white text-xs capitalize font-medium ${
              booking.status === "accepted"
                ? "bg-green-500"
                : booking.status === "rejected"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          >
            {booking.status}
          </span>
        </td>
        <td className="px-4 py-3 text-center space-x-2">
          {booking.status === "pending" && (
            <>
              <button
                onClick={() => updateStatus(booking._id, "accepted")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
              >
                Accept
              </button>
              <button
                onClick={open}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
              >
                Reject
              </button>
            </>
          )}
          {booking.status !== "pending" && (
            <span className="text-gray-500 text-xs italic">No action</span>
          )}
        </td>
      </tr>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/60" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium">
                Reject request
              </DialogTitle>
              <p>Are you sure you want to reject this request?</p>
              <div className="flex w-full mt-4 gap-2">
                <button
                  type="button"
                  className="flex-1 border border-gray-400 py-2 px-4 rounded hover:bg-blue-700 transition"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                  onClick={() => updateStatus(booking._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
