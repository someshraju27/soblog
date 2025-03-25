const jwt = require("jsonwebtoken");
const User = require("./models/Registeruser");

// Middleware to check if user is an admin
const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports =  verifyAdmin ;
