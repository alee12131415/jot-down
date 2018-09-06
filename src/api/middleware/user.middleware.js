const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const db = require('../database')

const key = require('../../../config').jwt_key

/**
 * Creates a user and returns token. Client will store in localStorage
 */
async function postUser(req, res) {
    const {name, pass} = req.body

    let id = shortid.generate()
    let hash = await argon2.hash(pass) // TODO: handle crash when missing fields

    // possible infinite loop, but unlikely
    while (await db.getUser('id').length > 0) {
        id = shortid.generate()
    }
    const response = await db.createUser(id, name, hash)

    if (response.status) {
        const token = jwt.sign({aud: id}, key, {
            algorithm: 'HS256',
            expiresIn: '1d',
            issuer: 'jot-down',
        })
        res.json({...response, token})
    }
    else {
        res.json(response)
    }
}

async function putUser(req, res) {
    const id = '' // TODO: placeholder
    const {type, payload} = req.body

    switch(type) {
        case 'pass': {
            const {pass} = payload
            const new_hash = await argon2.hash(pass)
            await db.updateUserHash(id, new_hash)
            res.json(await db.updateUserHash(id, new_hash))
            break
        }
        case 'name': {
            const {name} = payload
            res.json(await db.updateUserName(id, name))
            break
        }
        default:
            res.status(400).json()
    }
}

async function deleteUser(req, res) {
    const id = '' // TODO: placeholder

    res.json(await db.deleteUser(id))
}

module.exports = {
    postUser,
    putUser,
    deleteUser
}