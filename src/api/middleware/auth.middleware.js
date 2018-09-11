const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')

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

async function signup(req, res) {
    const {name, pass} = req.body

    if ((await db.getUserByName(name)).length > 0) {
        res.status(400).json({error: 'Name already taken'})
        return
    }
    
    let id = shortid.generate()
    let hash = await argon2.hash(pass) // TODO: handle crash when missing fields

    // possible infinite loop, but unlikely
    while ((await db.getUserById(id)).length > 0) {
        id = shortid.generate()
    }

    const response = await db.createUser(id, name, hash)

    if (response.status) {
        const token = jwt.sign({aud: id}, key, {
            algorithm: 'HS256',
            expiresIn: '1d',
            issuer: 'jot-down',
        })
        res.json({token})
    }
    else {
        res.status(500).json({error: 'Unable to create user'})
    }
}

module.exports = {
    verifyLogin,
    signup
}