import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import xssReqSanitizer from 'xss-req-sanitizer';
import logger from './config/logger.js';
import { STATUS_CODES } from './config/status.js';
import { errorConverter, errorHandler } from './middlewares/error.middleware.js';
import { rateLimiter, speedLimiter } from './middlewares/limiter.middleware.js';
import routes from './routes/index.js';
import ApiError from './utils/ApiError.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(helmet());
app.use(compression());
app.use(xssReqSanitizer());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(rateLimiter);
app.use(speedLimiter);

app.use('/api/v1', routes);

app.use((req, res, next) => {
    next(new ApiError(STATUS_CODES.NOT_FOUND, 'Not found'));
});

const stream = { write: (message) => logger.http(message.trim()) };
app.use(morgan('combined', { stream }));

app.use(errorConverter);
app.use(errorHandler);



export default app;