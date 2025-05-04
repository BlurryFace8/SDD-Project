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

export const getTourListingsByGuideId = async (req, res) => {
  const { guideId } = req.params;

  try {
    const listings = await TourListing.find({ guideId }).exec();

    if (!listings || listings.length === 0) {
      return res.status(404).json({ message: 'No listings found for this guide' });
    }

    res.status(200).json({
      message: 'Tour listings fetched successfully',
      listings,
    });
  } catch (err) {
    console.error('Error fetching tour listings by guide ID:', err);
    res.status(500).json({ message: 'Failed to fetch listings', error: err.message });
  }
};

export const getTourListingById = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await TourListing.findById(id)
      .populate('guideId')
      .exec();

    if (!listing) {
      return res.status(404).json({ message: 'Tour listing not found' });
    }

    res.status(200).json({
      message: 'Tour listing fetched successfully',
      listing,
    });
  } catch (err) {
    console.error('Error fetching tour listing by ID:', err);
    res.status(500).json({ message: 'Failed to fetch listing', error: err.message });
  }
};