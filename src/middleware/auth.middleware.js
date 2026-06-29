const jwt = require('jsonwebtoken')
const blocklistSchema = require('../models/blocklist')
const redis = require('../config/chechs')


async function identifyuser(req, res, next) {
    const token = req.cookies.tokens

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const istokenisvalid = await redis.get(token)

    if (istokenisvalid) {
        return res.status(401).json({
            message: 'block tokens'
        })

    }


    try {
        const decoded = jwt.verify(token, process.env.jwt_secret)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = identifyuser