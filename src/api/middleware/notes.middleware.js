const db = require('../database')
const shortid = require('shortid')

async function getNote(req, res, next) {
    try {
        const {user} = req.body
        res.json({notes: db.convertNotes(...(await db.getUserNotes(user)))})
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

async function syncNotes(req, res, next) {
    try {
        const {notes, user} = req.body
        const cloudNotesRaw = db.convertNotes(...(await db.getUserNotes(user)))
        let cloudNotes = {}
        cloudNotesRaw.forEach(({id, time}) => {
            cloudNotes[id] = time
        })
        const reduced = notes.reduce((accumulator, {id, title, content, time}) => {
            if (cloudNotes[id] && cloudNotes[id] <= time) {
                accumulator.push(db.updateNote(id, user, title, content, time))
            }
            else {
                accumulator.push(db.createNote(id, user, title, content, time))
            }
            return accumulator
        }, [])
        await Promise.all(reduced)
            .catch(() => {
                throw new Error()
            })
        
        res.json({notes: db.convertNotes(...(await db.getUserNotes(user)))})
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    getNote,
    postNote,
    putNote,
    deleteNote,
    syncNotes
}