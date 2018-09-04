const db = require('../database')

/**
 * TODO: get user from jwt
 * Using JWT, get user and return all notes related to user
 */
async function getNote(req, res) {
    try {
        res.status(200).json({hello: 'hello'})
    }
    catch(err) {
        res.status(500).send('Internal Server Error')
    }
}

/**
 * Insert a single note
 */
async function postNote(req, res) {
    try {
        // TODO: placeholder
        const user = 'backend api'

        const {id, title, content, time} = req.body
        res.json(await db.createNote(id, user, title, content, time))
    }
    catch(err) {
        res.status(500).send('Internal Server Error')
    }
}

/**
 * Update a single note
 */
async function putNote(req, res) {
    try {
        // TODO: placeholder
        const user = 'backend api'

        const {id, title, content, time} = req.body
        res.json(await db.updateNote(id, user, title, content, time))

    }
    catch(err) {
        res.status(500).send('Internal Server Error')
    }
}

/**
 * Delete a single note
 */
async function deleteNote(req, res) {
    try {
        // TODO: placeholder
        const user = 'backend api'

        const {id} = req.body
        res.json(await db.deleteNote(id, user))
    }
    catch(err) {
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getNote,
    postNote,
    putNote,
    deleteNote
}