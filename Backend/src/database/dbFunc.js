const { json } = require('express');
const query = require('./db')

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
}

module.exports = {
    dbFunctions
}
    