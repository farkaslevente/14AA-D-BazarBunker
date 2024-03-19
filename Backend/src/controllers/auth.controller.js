const { dbFunctions } = require('../database/dbFunc')
const { verifyToken, accessToken, refreshToken } = require('../middlewares/jwtMiddleware')
const bcrypt = require('bcryptjs')

const authController = {
    register: async function (req, res) {
        console.log('Register incoming...', req.body)
        const { name, email, location, password } = req.body;

        if (name, email, location, password) {
            try {
                const rows = await dbFunctions.execQueryWithReturn(
                    `SELECT * FROM felhasznalok WHERE email = '${email}'`) || []
                if (!rows || rows.length === 0) {

                    const hashedPassword = await bcrypt.hash(password, 10)

                    dbFunctions.execQueryRegister(`INSERT INTO felhasznalok (id, nev, email, hely, pPic, jelszo, role) VALUES
                    (null, '${name}', '${email}', '${location}', "https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg", '${hashedPassword}', 0)`)

                    res.status(200).json({
                        message: "Successful registration!"
                    })
                    
                }
                else {
                    return res.status(401).json({message: "User already exists!"})
                }
            } catch (err) {
                console.log(err.message);
                return res.status(500).send("Error in register!");
            }

        }
        else {
            return res.status(400).json({error: "Bad request"})
        }
    },


    login: async function (req, res) {
        console.log("Incoming login:", req.body)
        try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Username and password are required.' });

        const rows = await dbFunctions.execQueryWithReturn(
        `SELECT * FROM felhasznalok WHERE email = '${email}'`) || [];

        if (rows == [] || !rows || rows.length === 0) {
            return res.status(401).json({error: "Invalid email or password"})
        }
        
        let isPasswordValid = false
        const user = rows[0]
        if (password) { 
            isPasswordValid = await bcrypt.compare(password, user.jelszo)
            if (!isPasswordValid) {
            return res.status(401).json({"message": "Invalid email or password"})
            }
            else {
                const payload = {
                    id: user.id,
                    name: user.nev,
                    email: user.email,
                    location: user.hely,
                    pPic: user.pPic
                }
                const token = accessToken({payload})

                const d = new Date()
                dbFunctions.execQueryRegister(`INSERT INTO tokenek (id, data, date) VALUES 
                (null, '${token}', '${d}')`)

                req.session.token = token;
                res.status(200).json({token})
            }
        }
        else {
            return res.status(400).json({"message": "Bad request"})
        }
        
        } catch (err) {
            console.error("Error logging in!", err.message);
        }
    },
    signout: async function (req, res) {
        try {
            const cookies = req.cookies
            if (!cookies?.jwt) return res.status(204).json({message: "No content"});
            const refreshToken = cookies.jwt;

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            res.status(204).json({message: "You've been signed out!"});


            
          } catch (err) {
            console.error("Error logging in!", err.message);
          }
    },

    acceptToken: async function (req,res) {
        console.log("Incoming tokenverification...", req.body)
            return verifyToken(req, res)
    },
}

module.exports = {
    authController
}