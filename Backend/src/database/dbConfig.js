import { config } from "dotenv";
config();

const conf = {
    db: {
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_pwd, 
        database: process.env.DB_name,
        connectTimeout: 60000
    }
};

export default conf;