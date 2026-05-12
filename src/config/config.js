import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '../../.env') });

export default {
    env: process.env.ENVIRONMENT || 'development',
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        name: process.env.DB_NAME || 'backend',
    },
    jwt: {
        secret: process.env.JWT_SECRET || '124as5qW4578fdsfDASD2SDWFAwq852',
        expires: 7 * 24 * 60 * 60, // 7 days
    },
    aws: {
        s3: {
            payrollBaseUrl: process.env.AWS_S3_PAYROLL_BASE_URL || 'https://erp-jomakhata-file-uploads.s3.amazonaws.com/payroll/',
            hrisBaseUrl: process.env.AWS_S3_HRIS_BASE_URL || 'https://erp-jomakhata-file-uploads.s3.amazonaws.com/hris/',
        }
    }
};