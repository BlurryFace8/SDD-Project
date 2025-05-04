import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from "path";
import { deleteUser, test, updateUser,  getUserListings, getUser, patchUser} from '../controllers/user.controller.js';
import { verifyToken, verifyUser } from '../utils/verifyUser.js';

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


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.patch('/patch/:id', verifyUser, upload.single("avatar"), patchUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

export default router;