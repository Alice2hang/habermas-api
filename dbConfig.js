const { Pool } = require('pg');

const itemsPool = new Pool({
    connectionString: process.env.DBConnLink,
    ssl: {
        rejectUnauthorized: false
    }
    //ssl: false
});
module.exports = itemsPool;