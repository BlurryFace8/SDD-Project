import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const defaultValues = {
  date: "",
  numPeople: 1,
  message: "",
};

const CreateTourListingSchema = z.object({
  date: z.string().refine(
    (val) => {
      const selectedDate = new Date(val);
      const today = new Date();
      // Reset time for comparison
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    {
      message: "Date cannot be in the past",
    }
  ),
  numPeople: z.coerce
    .number()
    .min(1, { message: "At least one person must be booked" }),
  message: z.string().optional(),
});

const TourListingsPage = () => {
  const { listingId } = useParams(); // Get listingId from URL

  const { currentUser } = useSelector((state) => state.user);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(CreateTourListingSchema),
  });

  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(
        `http://localhost:3000/api/bookings/${currentUser._id}`,
        {
          ...data,
          tourId: listingId,
        }
      );
      reset(defaultValues);
      toast.success("Booking requested!!");
      close();
    } catch (err) {
      console.error("Error creating booking", err);
    }
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tours/${listingId}`
        ); // Update path if needed
        setListing(response.data.listing || null);
        console.log(response.data.listing);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching listings");
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
    <>
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
              <span className="font-semibold">📍 Location:</span>{" "}
              {listing.location}
            </p>
            <p>
              <span className="font-semibold">📞 Phone No:</span>{" "}
              {listing.guideId.phoneNum}
            </p>
            <p>
              <span className="font-semibold">🧑 Contact person:</span>{" "}
              {listing.guideId.username}
            </p>
            <p>
              <span className="font-semibold">💰 Price:</span> Rs.{" "}
              {listing.price}
            </p>
            <p>
              <span className="font-semibold">📝 Description:</span>
              <span className="block mt-1 text-gray-600">
                {listing.description}
              </span>
            </p>
            {listing.datesAvailable && listing.datesAvailable.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Available Dates
                </h2>
                <ul className="space-y-2">
                  {listing.datesAvailable.map((date, index) => {
                    const formattedDate = new Date(date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    );

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
          <div className="flex w-full mt-8 gap-4">
            <div className="flex-1 text-center w-full">
              <a
                href="/"
                className="w-full inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                ← Back to Listings
              </a>
            </div>

            <div className="flex-1">
              <Button
                className="w-full inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition flex-1"
                onClick={open}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
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
                Create booking
              </DialogTitle>
              <form
                onSubmit={onSubmit}
                className="mt-4 rounded max-w-md w-full mx-auto space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    {...register("date")}
                    required
                    className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {errors.date?.message && (
                    <p className="text-sm text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of People
                  </label>
                  <input
                    type="number"
                    {...register("numPeople")}
                    min="1"
                    required
                    className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {errors.numPeople?.message && (
                    <p className="text-sm text-red-500">
                      {errors.numPeople.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message (Optional)
                  </label>
                  <textarea
                    {...register("message")}
                    rows="3"
                    className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Add any notes or requests..."
                  />
                  {errors.message?.message && (
                    <p className="text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Submit Booking
                </button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default TourListingsPage;
