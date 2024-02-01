import { config } from "dotenv"
import mysql from "mysql"

config()



const _user = process.env.DB_user
const _host = process.env.DB_host
const _pwd = process.env.DB_pwd
const _name = process.env.DB_name

const con = mysql.createConnection({
    host: _host,
    user: _user,
    password: _pwd, 
    database: _name,
})

export default con;

