const query = require('./db')


const dbFunctions = {
    getAllUsers: async function (res) {
        res = await query(
        `SELECT id, nev, email, hely, pPic, jelszo
        FROM felhasznalok`
        );
        return res;
    },

    getAllItems: async function () {
    const rows = await query(
        `SELECT id, nev, email, hely, pPic, jelszo
        FROM termekek`
    );
    return rows;
    }
}

module.exports = {
    dbFunctions
}
    