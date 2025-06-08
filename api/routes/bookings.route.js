import express from 'express';
import {
  createBooking,
  getBookingsByGuide,
  getBookingsByUser,
  updateBookingStatus,
} from '../controllers/booking.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

// Create a booking
router.post('/:id', verifyUser, createBooking);
// Get bookings by user
router.get('/user/:id', verifyUser, getBookingsByUser);

// Get bookings for a guide
router.get('/guide/:id', verifyUser, getBookingsByGuide);

// Update booking status (accept/reject)
router.patch('/:id/status', verifyUser, updateBookingStatus);

export default router;
