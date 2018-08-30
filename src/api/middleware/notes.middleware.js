const db = require('../database')

/**
 * TODO: get user from jwt
 * Using JWT, get user and return all notes related to user
 */
async function getNote(req, res) {
    const {user} = req.body
    console.log(user)
    res.status(200).json({hello: 'hello'})
}

/**
 * Insert a single note
 */
async function postNote(req, res) {
    // TODO: placeholder
    const user = 'backend api'

    const {id, title, content, time} = req.body
    res.json(await db.createNote(id, user, title, content, time))
}

/**
 * Update a single note
 */
async function putNote(req, res) {
    // TODO: placeholder
    const user = 'backend api'

    const {id, title, content, time} = req.body
    res.json(await db.updateNote(id, user, title, content, time))
}

/**
 * Delete a single note
 */
async function deleteNote(req, res) {
    // TODO: placeholder
    const user = 'backend api'

    const {id} = req.body
    res.json(await db.deleteNote(id, user))
}

module.exports = {
    getNote,
    postNote,
    putNote,
    deleteNote
}