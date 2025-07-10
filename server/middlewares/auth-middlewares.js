const jwt = require('jsonwebtoken')
const InvalidToken = require('../models/invalid-tokens')

async function ensureAuthenticated(req, res, next) {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
        return res.status(401).json({ message: 'Access token not found' })
    }

    if (await InvalidToken.findOne({ accessToken })) {
        return res.status(401).json({ message: 'Access token invalid', code: 'AccessTokenInvalid' })
    }

    try {
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACC_SECRET)

        req.accessToken = { value: accessToken, exp: decodedAccessToken.exp }
        req.user = { id: decodedAccessToken.userId, role: decodedAccessToken.role }

        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Access token expired', code: 'AccessTokenExpired' })
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Access token invalid', code: 'AccessTokenInvalid' })
        } else {
            return res.status(500).json({ message: error.message })
        }
    }
}

const authorize = (role) => {
    return async (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        if(req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden', code: 'RoleNotAuthorized' })
        }

        next()
    }
}


module.exports = {
    ensureAuthenticated,
    authorize
}