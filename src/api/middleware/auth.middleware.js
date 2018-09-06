const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const db = require('../database')

const key = require('../../../config').jwt_key

async function verifyLogin(req, res) {
    const {name, pass} = req.body

    const result = await db.getUserByName(name)
    if (result.length > 0) {
        const {id, hash} = result[0]
        if (await argon2.verify(hash, pass)) {
            const token = jwt.sign({aud: id}, key, {
                algorithm: 'HS256',
                expiresIn: '1d',
                issuer: 'jot-down',
            })
            res.json({token})
        } else {
            res.status(401).send('Unauthorized')
        }

    } else {
        res.status(401).send('Unauthorized')
    }
}

module.exports = {
    verifyLogin
}