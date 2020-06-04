
import { Pool } from 'pg';


// Database Connection
export const database = new Pool({
    database: 'postgres',
    host: process.env.NODE_APP_URL,
    port: 5432,
    user: process.env.NODE_APP_ROLE,
    password: process.env.NODE_APP_PASS
});

database.on('connect', (client) => {
    client.query(`SET search_path TO my_schema, public`);
});