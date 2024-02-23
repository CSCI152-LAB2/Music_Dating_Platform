const jwt = require('jsonwebtoken')

const verifyCookie = (req, res, next) => {
    const { token } = req.body
    try {
        const verified_token = jwt.verify(token, process.env.SECRET_STR)
        if (verified_token) {
            res.status(200).json({ "message": "JSON web token successfully verified" })
            req.decodedToken = verified_token
            next();
        } else {
            res.status(401).json({ "message": "Unable to verify JSON web token" })
            return res.redirect('/login')
        }
    } catch (err) {
        console.log(err.message, " - redirected to login page");
        return res.redirect('/login');
    }
}

module.exports = { verifyCookie }