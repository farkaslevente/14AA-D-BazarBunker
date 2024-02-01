import { config } from "dotenv";
import mysql from "mysql"

config();

//DB_user = "bazarbunker"
//DB_pwd = "BBk20231208"
//DB_host = "bgs.jedlik.eu"
//DB_name = "bazarbunker"
const _user = "bazarbunker"
const _host = "bgs.jedlik.eu"
const _pwd = "BBk20231208"
const _name = "bazarbunker"

const con = mysql.createConnection({
    host: _host,
    user: _user,
    password: _pwd, 
    database: _name,
})

export default con;

