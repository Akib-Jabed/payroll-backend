import { defineConfig } from 'drizzle-kit';
import config from './src/config/config.js';

const { user, password, host, port, name } = config.database;

export default defineConfig({
    schema: './src/db/schema.js',
    out: './src/db',
    dialect: 'mysql',
    dbCredentials: {
        host: host,
        user: user,
        password: password,
        database: name,
        port: port,
    },
    tablesFilter: [
        'hr_*',
        'por_*',
        'hris_*',
        'acc_ledgers',
        'acc_voucher',
        'acc_fiscal_year',
        'users',
        'projects',
        'companies',
        'cost_center',
        'banks_original',
        'inv_items',
    ],
});