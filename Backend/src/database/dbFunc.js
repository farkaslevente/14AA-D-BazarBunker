const query = require('./db')
const bcrypt = require('bcryptjs')

const dbFunctions = {
    getUsers: async function (res) {
        res = await query(
        `SELECT *
        FROM felhasznalok`
        );
        return res;
    },

    getItems: async function (res) {
    res = await query(
        `SELECT *
        FROM termekek`
    );
    return res;
    },

    getPictures: async function (res) {
        res = await query(
            `SELECT *
            FROM kepek`
        );
        return res;
    },

    getSettlements: async function (res) {
        res = await query(
            'SELECT * FROM telepulesek'
        );
        return res;
    },
    
    getMessages: async function (res) {
        res = await query(
            'SELECT * FROM uzenetek'
        );
        return res;
    },

    getCountys: async function (res) {
        res = await query(
            'SELECT * FROM varmegyek'
        );
        return res;
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

    putUsers: async function (req) {
        console.log(req) + "\n";
        try {
            await query(`
            UPDATE felhasznalok SET 
            nev='${req.nev}', email='${req.email}', hely='${req.hely}', pPic='${req.pPic}', jelszo='${req.jelszo}'
            WHERE id='${req.id}';
            `);
        } catch (err) {
            console.error("Error posting!", err.message);
        }
    },

    deleteUsers: async function (req) {
        console.log(req)
        try {
            await query(`
            DELETE FROM felhasznalok WHERE id = ${req.id}`)
        } catch (err) {
            console.error("Error deleting!", err.message);
        }
    },

    execQuery: async function (req) {
        console.log(req)
        try {
            await query(`
            ${req.exec}`)
        } catch (err) {
            console.error("Error executing query!", err.message);
        }
    },

    executeQuery: async function (req) {
        try {
            const result = await query(req);
            console.log("Query executed successfully:", result);
            return Array.from(result);
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    },

    executeQueryRegister: async function (req, res) {
        try {
            await query(req);
            console.log("Query executed successfully");
            return res.status(200).json({"message": "Register was successful"})
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    },

    register: async function (req, res) {
        console.log("Incoming register:")
        console.log(req)
        try {
        const {nev, email, hely, jelszo} = req.body;
        const hashedPassword = await bcrypt.hash(jelszo, 10)

        dbFunctions.executeQueryRegister(
            `INSERT INTO felhasznalok (id, nev, email, hely, pPic, jelszo) VALUES (null, '${nev}', '${email}', '${hely}', null, '${hashedPassword}')`
        );
        return res
        } catch (err) {
            console.error("Error registering!", err.message);
        }
    },

    login: async function (req, res) {
        console.log("Incoming login:")
        try {
        const {email, password} = req.body;

        const rows = await dbFunctions.executeQuery(
        `SELECT * FROM felhasznalok WHERE email = '${email}'`) || [];

        if (!rows || rows.length === 0) {
            return res.status(401).json({error: "Invalid email or password"})
        }

        let isPasswordValid = false
        const user = rows[0]
        if (password) { 
            isPasswordValid = await bcrypt.compare(password, user.jelszo)
            if (!isPasswordValid) return res.status(401).json({"message": "Invalid email or password"})
            else {

                return user; 
            }
        }
        else {
            return res.status(400).json({"message": "Bad request"})
        }
        
        } catch (err) {
            console.error("Error logging in!", err.message);
        }
    }
}

module.exports = {
    dbFunctions
}