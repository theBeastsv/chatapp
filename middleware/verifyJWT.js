const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRETKEY; // Replace with your actual secret key

const verifyJWT = (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }
 
  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send("Forbidden");
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;
