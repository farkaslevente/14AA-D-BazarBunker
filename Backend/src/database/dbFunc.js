const query = require('./db')


const dbFunctions = {
    getAllUsers: async function (res) {
        res = await query(
        `SELECT id, nev, email, hely, pPic, jelszo
        FROM felhasznalok`
        );
        return res;
    },

    getAllItems: async function (res) {
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
}

module.exports = {
    dbFunctions
}
    