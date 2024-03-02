const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config();

function verifyToken(req, res) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.userId = decoded.userId;
        return res.status(200).json({message: "Authorized"})
    });
}

 function createToken (payload, expireDate) {
    const token = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: expireDate});
    return token;
 } 

module.exports = {verifyToken, createToken}