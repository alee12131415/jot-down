const argon2 = require('argon2')
const shortid = require('shortid')
const db = require('../database')

async function postUser(req, res) {
    const {name, pass} = req.body

    let id = shortid.generate()
    let hash = await argon2.hash(pass) // TODO: handle crash when missing fields

    // possible infinite loop, but unlikely
    while (await db.getUser('id').length > 0) {
        id = shortid.generate()
    }

    res.json(await db.createUser(id, name, hash))
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