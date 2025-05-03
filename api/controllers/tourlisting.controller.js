import TourListing from '../models/listing.model.js';

export const getAllTourListings = async (req, res) => {
    try {
      const listings = await TourListing.find().exec();
  
      res.status(200).json({
        message: 'Tour listings fetched successfully',
        listings,
      });
    } catch (err) {
      console.error('Error fetching tour listings:', err);
      res.status(500).json({ message: 'Failed to fetch listings', error: err.message });
    }
  };
  