import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { STATUS_CODES } from '../config/status.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const verifyToken = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const tokenQuery = req.query.token;
    if (!authHeader && !tokenQuery) {
        throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Please log in to get access');
    }

    const token = authHeader ? authHeader.split(' ')[1] : tokenQuery;
    if (!token) {
        throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Please log in to get access');
    }

    try {
        req.user = jwt.verify(token.trim(), config.jwt.secret);
        next();
    } catch (error) {
        throw new ApiError(STATUS_CODES.FORBIDDEN, 'Authorization failed');
    }
});

export default verifyToken;