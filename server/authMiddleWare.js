const jwt = require('jsonwebtoken');
const User = require("./models/Registeruser");
const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
  

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
   
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};



module.exports = authenticateToken;
