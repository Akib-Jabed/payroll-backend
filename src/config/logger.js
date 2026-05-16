import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import 'winston-daily-rotate-file';
import config from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS_DIR = path.join(__dirname, '../../logs');
const isDevelopment = config.env === 'development';

const errorStackFormat = winston.format((info) => {
    if (info instanceof Error || info.stack) {
        return { ...info, stack: info.stack, message: info.message };
    }
    return info;
});

const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    errorStackFormat(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] ${level}: ${message}${metaStr}`;
    }),
);

const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    errorStackFormat(),
    winston.format.json(),
);

const transports = [
    new winston.transports.DailyRotateFile({
        filename: path.join(LOGS_DIR, 'error-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        maxSize: '20m',
        maxFiles: '30d',
        zippedArchive: true,
        format: fileFormat,
    }),
    new winston.transports.DailyRotateFile({
        filename: path.join(LOGS_DIR, 'combined-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
        zippedArchive: true,
        format: fileFormat,
    }),
];

if (isDevelopment) {
    transports.push(new winston.transports.Console({ format: consoleFormat }));
}

const logger = winston.createLogger({
    level: isDevelopment ? 'debug' : 'info',
    transports,
    exceptionHandlers: [
        new winston.transports.DailyRotateFile({
            filename: path.join(LOGS_DIR, 'exceptions-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d',
            zippedArchive: true,
            format: fileFormat,
        }),
    ],
    rejectionHandlers: [
        new winston.transports.DailyRotateFile({
            filename: path.join(LOGS_DIR, 'rejections-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d',
            zippedArchive: true,
            format: fileFormat,
        }),
    ],
    exitOnError: false,
});

export default logger;
