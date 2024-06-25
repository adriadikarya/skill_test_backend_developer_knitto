const { Pool, Client  } = require('pg');
const pool = new Pool({
    user : gConfig.username,
    host: gConfig.host,
    database: gConfig.db,
    password: gConfig.password,
    port: gConfig.port,
});
module.exports = pool;