import { DrizzleError, DrizzleQueryError } from 'drizzle-orm';
import config from '../config/config.js';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';

export const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(err instanceof ApiError)) {
        const statusCode = err.statusCode || err instanceof DrizzleError || err instanceof DrizzleQueryError ? 400 : 500;
        const message = err.message || 'Something went wrong';
        error = new ApiError(statusCode, message, false);
    }

    next(error);
};

export const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    let { statusCode, message } = err;
    if (config.env !== 'development' && !err.isOperational) {
        statusCode = 500;
        message = 'Something went wrong';
    }

    const response = {
        success: false,
        code: statusCode,
        message,
    };

    res.status(statusCode).send(response);
};
