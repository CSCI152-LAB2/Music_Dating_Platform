const jwt = require('jsonwebtoken')

const verifyCookie = (req, res, next) => {
    const token = req.cookies.token; // Assuming the token is stored in a cookie named 'token'
    if (!token) {
        return res.status(401).json({ "message": "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_STR);
        req.decodedToken = decoded;
        next();
    } catch (err) {
        console.log(err.message, " - unable to verify token");
        res.status(401).json({ "message": "Invalid token" });
    }
}

module.exports = { verifyCookie }

