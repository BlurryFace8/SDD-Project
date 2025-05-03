import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {createGuideProfile, getGuideById, getGuides, updateGuideProfile, upsertGuideProfile} from '../controllers/guide.controller.js'
import { getUser } from '../controllers/user.controller.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });


router.post('/create', upload.array('travelPhotos', 5), createGuideProfile);
router.get('/', getGuides);
router.get('/:id', getGuideById);
router.patch('/update', upload.array('travelPhotos', 5), updateGuideProfile);
router.patch('/upsert', upload.array('travelPhotos', 5), upsertGuideProfile);


export default router;
