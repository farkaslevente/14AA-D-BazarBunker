const query = require('../database/db')
const { dbFunctions } = require('../database/dbFunc')


const userController = {
    patchUsers: async function (req, res) {
        console.log("Patching incoming...", req);
        try {
            const {name, email, location, pPic} = req;

            const rows = await dbFunctions.execQueryWithReturn(
                `SELECT * FROM felhasznalok WHERE email = '${email}'`) || [];
            const hashed = rows[0].jelszo

            await query(`UPDATE felhasznalok SET nev= '${name}', email= '${email}', hely= '${location}', pPic= '${pPic}', jelszo= '${hashed}' WHERE id=${req.id}`);
            
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