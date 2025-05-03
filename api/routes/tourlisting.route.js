import express from 'express';
import TourListing from '../models/listing.model.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllTourListings } from '../controllers/tourlisting.controller.js';

const router = express.Router();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDestinationPath = path.join(path.resolve(__dirname, "../"), 'uploads')

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDestinationPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/create', upload.array('images'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Files:', req.files);

    // Check for missing form data
    if (!req.body.title || !req.body.location || !req.body.description || !req.body.price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    // Ensure datesAvailable exists and is handled as an array
    let datesAvailable = req.body.datesAvailable;
    if (datesAvailable) {
      if (typeof datesAvailable === 'string') {
        // If it's a string (e.g., comma-separated), split it into an array
        datesAvailable = datesAvailable.split(',');
      }
    } else {
      // If no datesAvailable is provided, handle this case
      return res.status(400).json({ message: 'datesAvailable field is required' });
    }

    const listing = new TourListing({
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
      price: req.body.price,
      datesAvailable, // Now it's guaranteed to be an array
      images: imagePaths,
      guideId: req.body.guideId, // Add any other fields if required
    });

    const savedListing = await listing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    console.error('Error creating tour listing:', err);
    res.status(500).json({ message: 'Failed to create listing', error: err.message });
  }
});

router.get('/', getAllTourListings); 


export default router;
