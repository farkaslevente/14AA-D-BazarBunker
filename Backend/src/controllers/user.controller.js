const query = require('../database/db')
const bcrypt = require('bcryptjs')


const userController = {
    patchUsers: async function (req, res) {
        console.log(req) + "\n";
        try {
            // WAITING TO FINISH

            await query(`UPDATE felhasznalok SET nev= ?, email= ?, hely= ?, pPic= ?, jelszo= ? WHERE id=${req.id}`, insertValues);
            
            res.status(200).json({message: "User patched succesfully!"})
        } catch (err) {
            console.error("Error posting!", err.message);
        }
    },

    deleteUsers: async function (req, res) {
        console.log("Incoming delete on users...", req)
        try {
            await query(`
            DELETE FROM felhasznalok WHERE id = ${req.id}`)
            return res.status(200).json({message: `User with id: ${req.id} was deleted succesfully`})
        } catch (err) {
            console.error("Error deleting!", err.message);
        }
    },
}

module.exports = {
    userController
}