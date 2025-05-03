import GuideProfile from '../models/guide.model.js';
import User from '../models/user.model.js';

export const createGuideProfile = async (req, res) => {
  try {
    const { userId, experience, description } = req.body;
    const photoPaths = req.files.map(file => file.path);

    const guideProfile = new GuideProfile({
      user: userId,
      experience,
      description,
      travelPhotos: photoPaths
    });

    const savedProfile = await guideProfile.save();
    await User.findByIdAndUpdate(userId, { guideProfile: savedProfile._id });

    res.status(201).json({
      message: 'Guide profile created successfully',
      profile: savedProfile
    });
  } catch (error) {
    console.error('Guide profile creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGuides = async (req, res) => {
  try {
    const guides = await GuideProfile.find()
      .populate('user', 'username email avatar') // Adjust fields as necessary
      .exec();

    res.status(200).json({
      message: 'Guides fetched successfully',
      guides
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGuideById = async (req, res) => {
  try {
    const { id } = req.params;

    const guide = await GuideProfile.findOne({ user: id })
      .populate('user', '_id username email avatar') // populate user details
      .exec();

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    res.status(200).json({
      message: 'Guide fetched successfully',
      guide
    });
  } catch (error) {
    console.error('Error fetching guide:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateGuideProfile = async (req, res) => {
  try {
    const { userId, experience, description } = req.body;

    // Find the existing guide profile for the user
    const guideProfile = await GuideProfile.findOne({ user: userId });

    if (!guideProfile) {
      return res.status(404).json({ message: 'Guide profile not found' });
    }

    // Update fields if provided
    if (experience) guideProfile.experience = experience;
    if (description) guideProfile.description = description;

    // If new photos are uploaded, append them
    if (req.files && req.files.length > 0) {
      const newPhotoPaths = req.files.map(file => file.path);
      guideProfile.travelPhotos.push(...newPhotoPaths);
    }

    const updatedProfile = await guideProfile.save();

    res.status(200).json({
      message: 'Guide profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Error updating guide profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const upsertGuideProfile = async (req, res) => {
  try {
    const { userId, experience, description } = req.body;

    // Prepare the update fields
    const updateFields = {
      experience,
      description,
    };

    // If files were uploaded, include photo paths
    if (req.files && req.files.length > 0) {
      updateFields.travelPhotos = req.files.map(file => file.path);
    }

    // Upsert the guide profile: create if not exists, update if exists
    const guideProfile = await GuideProfile.findOneAndUpdate(
      { user: userId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Ensure the User is linked to the guide profile (on first creation)
    await User.findByIdAndUpdate(userId, { guideProfile: guideProfile._id });

    res.status(200).json({
      message: 'Guide profile upserted successfully',
      profile: guideProfile
    });
  } catch (error) {
    console.error('Error upserting guide profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
