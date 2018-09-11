const db = require('../database')
const shortid = require('shortid')

/**
 * TODO: get user from jwt
 * Using JWT, get user and return all notes related to user
 */
async function getNote(req, res, next) {
    try {
        const {user} = req.body
        res.json(await db.getUserNotes(user))
    }
    catch(err) {
        next(err)
    }
}

/**
 * Insert a single note
 */
async function postNote(req, res, next) {
    try {
        const {user, title, content, time} = req.body
        let id
        if (req.body.id) {
            id = req.body.id
        } else {
            // possible infinite loop, but unlikely
            id = shortid.generate()
            while ((await db.getNote(id, user)).length > 0) {
                id = shortid.generate()
            }
        }
        res.json(await db.createNote(id, user, title, content, time))
    }
    catch(err) {
        next(err)
    }
}

/**
 * Update a single note
 */
async function putNote(req, res, next) {
    try {
        const {id, user, title, content, time} = req.body
        res.json(await db.updateNote(id, user, title, content, time))
    }
    catch(err) {
        next(err)
    }
}

/**
 * Delete a single note
 */
async function deleteNote(req, res, next) {
    try {
        const {id, user} = req.body
        res.json(await db.deleteNote(id, user))
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    getNote,
    postNote,
    putNote,
    deleteNote
}