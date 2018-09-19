const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const db = require('../database')

const key = process.env.NODE_ENV === 'production'? process.env.JWT_SECRET : require('../../../config').jwt_key

async function putUser(req, res) {
    const {user: id, type, payload} = req.body

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
    const {user: id} = req.body
    res.json(await db.deleteUser(id))
}

module.exports = {
    putUser,
    deleteUser
}