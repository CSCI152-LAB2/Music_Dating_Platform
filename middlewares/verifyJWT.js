const jwt = require('jsonwebtoken')

const verifyCookie = (req, res, next) => {
    const { token } = req.body
    try {
        const bool_token = jwt.verify(token, process.env.SECRET_STR)
        if (bool_token) {
            res.status(200).json({ "message": "JSON web token successfully verified" })
            next();
        } else {
            res.status(401).json({ "message": "Unable to verify JSON web token" })
            return res.redirect('/login')
        }
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = verifyCookie