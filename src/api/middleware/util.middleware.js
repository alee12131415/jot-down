const jwt = require('jsonwebtoken')

const key = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : require('../../../config').jwt_key

exports.verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        const auth_arr = req.headers.authorization.split(' ')
        if (auth_arr[0] === 'Bearer' && auth_arr[1]) {
            jwt.verify(auth_arr[1], key, {algorithm: 'HS256', issuer: 'jot-down'}, function(err, decoded) {
                if (err) {
                    res.status(401).json({error: 'Invalid Token'})
                }
                else {
                    if (req.body) req.body.user = decoded.aud
                    next()
                }
            })
            return
        }
    }
    res.status(401).json({error: 'Invalid Token'})
}

exports.catchError = (err, req, res, next) => {
    if (err) {
        res.status(500).send('Internal Server Error')
    } else {
        next()
    }
}