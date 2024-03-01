const query = require('./db')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const { config } = require("dotenv");
config();

const dbFunctions = {
    getUsers: async function (res) {
        res = await query(
        `SELECT *
        FROM felhasznalok`
        );
        return res;
    },

    getPictures: async function(res) {
        res = await query(`
        SELECT * FROM kepek`)
        return res
    },

    postUsers: async function (req) {
        console.log(req);
        const insertValues = [req.id, req.nev, req.email, req.hely, req.pPic, req.jelszo]
        try {
            await query(`INSERT INTO felhasznalok (id, nev, email, hely, pPic, jelszo)
            VALUES (?, ?, ?, ?, ?, ?)`, insertValues);
        } catch (err) {
            console.error("Error posting!", err.message);
        }
    },

    putUsers: async function (req, res) {
        console.log(req) + "\n";
        try {
            const hashedPassword = await bcrypt.hash(req.password, 10) 
            await query(`
            UPDATE felhasznalok SET 
            nev='${req.name}', email='${req.email}', hely='${req.location}', pPic='${req.pPic}', jelszo='${hashedPassword}'
            WHERE id='${req.id}';
            `);
            res.status(200).json({message: "User patched succesfully!"})
        } catch (err) {
            console.error("Error posting!", err.message);
        }
    },

    deleteUsers: async function (req, res) {
        console.log(req)
        try {
            await query(`
            DELETE FROM felhasznalok WHERE id = ${req.id}`)
            return res.status(200).json({message: `User with id: ${req.id} was deleted succesfully`})
        } catch (err) {
            console.error("Error deleting!", err.message);
        }
    },

    execQuerystring: async function (req) {
        console.log(req)
        try {
            await query(`
            ${req.exec}`)
        } catch (err) {
            console.error("Error executing query!", err.message);
        }
    },
    
        execQueryWithReturn: async function (req) {
            try {
                const result = await query(req);
                return Array.from(result);
            } catch (error) {
                console.error("Error executing query:", error);
                throw error;
            }
        },
    
        execQueryRegister: async function (req) {
            try {
                query(req);
            } catch (error) {
                console.error("Error executing query:", error);
                throw error;
            }
        },

    register: async function (req, res) {
        console.log('Register incoming...', req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { name, email, location, password } = req.body;

        if (name, email, location, password) {
            try {
                const rows = await dbFunctions.execQueryWithReturn(
                    `SELECT * FROM felhasznalok WHERE email = '${email}'`) || []
                if (!rows || rows.length === 0) {

                    const hashedPassword = await bcrypt.hash(password, 10)
    
                    dbFunctions.execQueryRegister(`INSERT INTO felhasznalok (id, nev, email, hely, pPic, jelszo) VALUES
                     (null, '${name}', '${email}', '${location}', null, '${hashedPassword}')`)
    
                    const token = jwt.sign(
                        {name, email},
                        process.env.SECRET, {
                        expiresIn: '1d'
                    })

                    const d = new Date()
                    dbFunctions.execQueryRegister(`INSERT INTO tokenek (id, data, date) VALUES 
                    (null, '${token}', '${d}')`)
    
                    res.status(200).json({
                        token
                    })
                    
                }
                else {
                    return res.status(401).json({message: "User already exists!"})
                }
            } catch (err) {
                console.log(err.message);
                res.status(500).send("Error in register!");
            }

        }
        else {
            return res.status(400).json({error: "Bad request"})
        }
    },


    login: async function (req, res) {
        console.log("Incoming login:")
        console.log(req.body)
        try {
        const {email, password} = req.body;

        const rows = await dbFunctions.execQueryWithReturn(
        `SELECT * FROM felhasznalok WHERE email = '${email}'`) || [];

        if (!rows || rows.length === 0) {
            return res.status(401).json({error: "Invalid email or password"})
        }

        let isPasswordValid = false
        const user = rows[0]
        if (password) { 
            isPasswordValid = await bcrypt.compare(password, user.jelszo)
            if (!isPasswordValid) {
             return res.status(401).json({"message": "Invalid email or password"})
            }
            else {

                    

                const token = jwt.sign(
                    {user: [user.nev, user.email, user.pPic]},
                    process.env.SECRET, {
                    expiresIn: '1d'
                })

                const d = new Date()
                dbFunctions.execQueryRegister(`INSERT INTO tokenek (id, data, date) VALUES 
                (null, '${token}', '${d}')`)

                res.status(200).json({
                    token
                })
            }
        }
        else {
            return res.status(400).json({"message": "Bad request"})
        }
        
        } catch (err) {
            console.error("Error logging in!", err.message);
        }
    },

    deleteToken: async function (req, res) {
        console.log("Delete incoming...")
        console.log(req)
        try {
            await query(`
            DELETE FROM tokenek WHERE id = ${req.id}`)
            return res.status(200).json({message: `Token id:${req.id} was deleted succesfully`})
        } catch (err) {
            console.error("Error deleting!", err.message);
            res.status(500).json({error: "Internal server error!"})
        }

    }
}
module.exports = {
    dbFunctions
}