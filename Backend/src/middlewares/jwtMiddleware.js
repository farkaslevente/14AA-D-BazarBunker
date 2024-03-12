const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth.config')

verifyToken = (req, res, next) => {

  const token = req.headers['authorization'];
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).send({ message: "Invalid token or not a Bearer token" });
  }
  const tokenOnly = token.slice(7, token.length);
  console.log(tokenOnly)

    if (!tokenOnly) {
      return res.status(403).send({ message: "Invalid token" });
    }
  
    jwt.verify(tokenOnly,
      secret,
      (err, decoded) => {
        if (err) {
          // Handle the case when the token is invalid or expired
          if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ message: "Token expired" });
          } else {
            return res.status(401).send({ message: "Unauthorized" });
          }
        }
        req.userId = decoded.id;
        next();
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