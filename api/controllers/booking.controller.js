import Booking from '../models/bookings.model.js';
import Tour from '../models/listing.model.js';

export const createBooking = async (req, res) => {
  try {
    const { tourId, date, numPeople, message } = req.body;
    const userId = req.user._id;

    // Find the tour to get the guideId
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const guideId = tour.guideId;

    // Prevent guide from booking their own tour
    if (guideId.toString() === userId.toString()) {
      return res.status(400).json({ message: "You can't book your own tour." });
    }

    // Create booking
    const booking = new Booking({
      user: userId,
      guide: guideId,
      tourListing: tourId,
      date,
      numPeople,
      message
    });

    await booking.save();
    res.status(201).json({ message: 'Booking request sent successfully!', booking });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ message: 'Server error while creating booking.' });
  }
};

export const getBookingsByUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const bookings = await Booking.find({ user: userId })
        .populate('tourListing', 'title location price') // populate relevant tour info
        .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Server error while fetching bookings.' });
    }
};

export const getBookingsByGuide = async (req, res) => {
    try {
      const guideId = req.user._id;
  
      const bookings = await Booking.find({ guide: guideId })
        .populate('tourListing', 'title location price')
        .populate('user', 'username email') // optionally include user info
        .sort({ createdAt: -1 });
  
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching guide bookings:', error);
      res.status(500).json({ message: 'Server error while fetching guide bookings.' });
    }
  };
  

  export const updateBookingStatus = async (req, res) => {
    try {
      const { status, bookingId } = req.body;
      console.log({status, bookingId})
  
      if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
      );
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({ message: `Booking ${status} successfully`, booking });
    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ message: 'Server error while updating status' });
    }
  };