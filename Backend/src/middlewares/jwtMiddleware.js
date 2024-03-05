const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth.config')

function verifyToken(req, res) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "Invalid token provided" });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unathorized" });
        }
        req.userId = decoded.userId;
        return res.status(200).json({message: "Authorized"})
    });
}

 function createToken (payload, expireDate) {
    const token = jwt.sign(
        payload,
        secret,
        { expiresIn: expireDate});
    return token;
 } 

module.exports = {verifyToken, createToken}