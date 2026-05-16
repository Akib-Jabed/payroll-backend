import app from './src/app.js';
import config from './src/config/config.js';
import logger from './src/config/logger.js';

const { port } = config.server;

const server = app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('✅ Server gracefully shutted down...');
        });
    }
    process.exit(1);
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    exitHandler();
});

process.on('SIGINT', () => {
    logger.info('SIGINT received');
    exitHandler();
});