const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth.config')

verifyToken = (req, res, next) => {
    let token = req.session.token;
  
    if (!token) {
      return res.status(403).send({ message: "Invalid token" });
    }
  
    jwt.verify(token,
                secret,
              (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Unauthorized",
                  });
                }
                req.userId = decoded.id;
                next();
              });
  };

 function createToken (payload, expireDate) {
    const token = jwt.sign(
        payload,
        secret,
        { expiresIn: expireDate});
    return token;
 } 

module.exports = {verifyToken, createToken}