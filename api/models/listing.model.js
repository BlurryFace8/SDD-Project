import mongoose from "mongoose";

const TourListingSchema = new mongoose.Schema({
  guideId:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true},
  location:{ type: String, required: true},
  description:{type: String, required: true},
  price: {type: Number, required:true},
  datesAvailable:[String],
  images: [String],
  createdAt: {type: Date, default: Date.now},

});

export default mongoose.model('TourListing', TourListingSchema);