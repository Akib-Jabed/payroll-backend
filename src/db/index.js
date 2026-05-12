import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import config from '../config/config.js';
import * as relations from './relations.js';
import * as schema from './schema.js';

const { host, user, password, name, port } = config.database;

const poolConnection = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: name,
    port: port,
});
const db = drizzle({
    client: poolConnection,
    schema: { ...schema, ...relations },
    mode: 'default',
});

export default db;