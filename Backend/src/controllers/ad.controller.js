const query = require('../database/db')


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
    }
}

module.exports = {
    adController
}