const { config } = require("dotenv");
config();

const conf = {
    db: {
        host: process.env.DB_local_host,
        user: process.env.DB_local_user,
        password: process.env.DB_local_pwd, 
        database: process.env.DB_name,
        connectTimeout: 60000
    }
};

module.exports = conf;