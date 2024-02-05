import mysql from "mysql2/promise";
import config from "../database/dbConfig.js"

async function query(sql, params) {
    const con = await mysql.createConnection(config.db);
    const [results,] = await con.execute(sql, params);

    return results;
}

export default query;