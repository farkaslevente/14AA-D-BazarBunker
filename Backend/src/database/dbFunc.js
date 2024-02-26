const query = require('./db')

const dbFunctions = {
    getUsers: async function (res) {
        res = await query(
        `SELECT *
        FROM felhasznalok`
        );
        return res;
    },

    getAds: async function (res) {
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
    }
}

module.exports = {
    dbFunctions
}