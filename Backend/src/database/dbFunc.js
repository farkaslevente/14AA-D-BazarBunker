const query = require('./db')

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

    },

    getTokens: async function (res) {
        try {
            return res = await query(`
            SELECT * FROM tokenek`)
        } catch (err) {
            console.error("Error getting!", err.message);
            res.status(500).json({error: "Internal server error!"})
        }
    }
}
module.exports = {
    dbFunctions
}