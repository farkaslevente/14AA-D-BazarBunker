const query = require('./db')

const dbFunctions = {
    getUsers: async function (res) {
        res = await query(
        `SELECT *
        FROM felhasznalok`
        );
        return res;
    },

    getUserById: async function (req) {
        const id = req.params.id
        res = await query(`
        SELECT * FROM felhasznalok WHERE id = '${id}'`)

        const payload = {
            id: res[0].id,
            name: res[0].nev,
            email: res[0].email,
            location: res[0].hely,
            pPic: res[0].pPic,
            phone: res[0].telefonszam
        }
        return payload
    },

    getPictures: async function(res) {
        res = await query(`
        SELECT * FROM kepek`)
        return res
    },

    getSettlements: async function(res) {
        res = await query(`
        SELECT * FROM telepulesek`)
        return res
    },

    getCounties: async function(res) {
        res = await query(`
        SELECT * FROM varmegyek`)
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
            res = await query(`
            SELECT * FROM tokenek`)
            return res
        } catch (err) {
            console.error("Error getting!", err.message);
            res.status(500).json({error: "Internal server error!"})
        }
    },

    getAds: async function (res) {
        try {
            res = await query(`
            SELECT * FROM hirdetesek`)
            return res
        } catch (err) {
            console.error("Error getting!", err.message);
            res.status(500).json({error: "Internal server error!"})
        }
    },
    
    postAds: async function (req,res) {
        try {
            const {name, description, category, price, countyId, settlement, ownerId} = req.body
            const d = new Date()
            await query(`INSERT INTO hirdetesek (id, nev, leiras, kategoria, ar, varmegyeId, telepules, tulajId, datum) VALUES 
            (null, '${name}', '${description}', '${category}', '${price}', '${countyId}', '${settlement}', '${ownerId}', '${d}')`)
            res.status(200).json({message: "Ad successfully uploaded!"})
        } catch (err) {
            console.error("Error posting ads!", err.message);
            res.status(500).json({error: "Internal server error!"})
        }
    },

}
module.exports = {
    dbFunctions
}