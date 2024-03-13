const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth.config')

verifyToken = (req, res, next) => {

  const reqToken = req.headers['authorization'];

    if (!reqToken) {
      return res.status(403).send({ message: "Invalid token" });
    } else if (!reqToken.startsWith('Bearer ')) {
      return res.status(403).send({ message: "Not a Bearer token" });
    }

    const token = reqToken.slice(7, reqToken.length);
  
    jwt.verify(token,
      secret,
      (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ message: "Token expired" });
          } else {
            return res.status(401).send({ message: "Unauthorized" });
          }
        }
        next()
      });
  };

 function accessToken (payload) {
    const token = jwt.sign(
        payload,
        secret,
        { expiresIn: '1d'});
    return token;
 } 

 function refreshToken (payload) {
  const token = jwt.sign(
      payload,
      secret,
      { expiresIn: '1d'});
  return token;
} 

module.exports = {verifyToken, accessToken, refreshToken}