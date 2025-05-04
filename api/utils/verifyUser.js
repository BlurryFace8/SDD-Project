import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import User from '../models/user.model.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};

export const verifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the user exists in DB
    const user = await User.findById(id);
    if (!user) return next(errorHandler(401, 'Unauthorized'));

    req.user = user; // attach user to request if needed later
    next();
  } catch (err) {
    next(errorHandler(500, 'Server error'));
  }
};