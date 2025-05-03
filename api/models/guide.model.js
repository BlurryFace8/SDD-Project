import mongoose from "mongoose";

const guideProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    travelPhotos: [String],
    experience:{
        type: String,
        maxlength: 2000
    },
    description:{
        type: String,
        maxlength: 1000
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Guide = mongoose.model('Guide',guideProfileSchema);
export default Guide;