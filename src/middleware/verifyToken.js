require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token=req.headers['xaccess-token']
    if (!token) return res.sendStatus(401)

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}
