const query = require('../database/db')
const { dbFunctions } = require('../database/dbFunc')

const adController = {
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
    
    postAds: async function (req,res,id) {
        try {
            const {name, description, category, price, countyId, settlement} = req.body
            const d = new Date()
            await query(`INSERT INTO hirdetesek (id, nev, leiras, kategoria, ar, varmegyeId, telepules, tulajId, datum) VALUES 
            (null, '${name}', '${description}', '${category}', '${price}', '${countyId}', '${settlement}', '${id}', '${d}')`)
            res.status(200).json({message: "Ad successfully uploaded!"})
        } catch (err) {
            console.error("Error posting ads!", err.message);
            res.status(500).json({error: "Internal server error!"})
        }
    },

    editAd: async function (req,res,id,itemid) {
        try {
            const {name, description, category, price, countyId, settlement} = req.body
            const d = new Date()
            await query(`UPDATE hirdetesek SET nev = '${name}', leiras = '${description}', kategoria = '${category}', ar = '${price}', varmegyeId = '${countyId}',
            telepules = '${settlement}', tulajId = '${id}', datum = '${d}' WHERE id = '${itemid}'`)
            res.status(200).json({message: "Ad successfully updated!"})
        } catch (err) {
            console.error("Error posting ads!", err.message);
            res.status(500).json({error: "Internal server error!"})
        }
    },

    deleteAd: async function (req, res, userId, id) {
        console.log("Incoming delete on ads...")
        try {
            const rows = await dbFunctions.execQueryWithReturn(`
            SELECT * FROM hirdetesek WHERE id = '${id}'`) || []
            const ad = rows[0]
            if (ad === undefined) {
                return res.status(404).json({message: "Ad not found"})
            }
            if (ad.tulajId == userId) {
                await query(`
                DELETE FROM hirdetesek WHERE id = ${id}`)
                return res.status(200).json({message: `Ad with id: ${id} was deleted succesfully`})
            } else {
                return res.status(403).json({message: "Unathorized action"})
            }
            
        } catch (err) {
            console.error("Error deleting!", err.message);
        }
    },
}

module.exports = {
    adController
}