const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')

const db = require('../database')
const key = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : require('../../../config').jwt_key

const nameRegex = /^[a-zA-Z0-9_]{1,24}$/
const passRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=]{6,24}$/

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

    if (!(nameRegex.test(name) && passRegex.test(pass))) {
        res.status(400).send({error: 'Invalid Name or Password'})
        return
    }

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