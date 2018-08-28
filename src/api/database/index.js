//  Database class wrapper
// 
// on dev create your own database.config.js
// module.exports = {
//     connnetionString: CONNECTION_STRING_HERE,
//     ssl: true
// }

const Client = require('pg').Client

// single instance, not exactly a singleton
// do not expose
// figure out pools later
const dbClient = new Client(
    process.env.NODE_ENV === 'production' && process.end.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: true
        }
        : require('./database.config')
)

// declare constants
const TABLE_NOTE = 'notes'

const NOTE_ID = 'id'
const NOTE_USER = 'user_id'
const NOTE_TITLE = 'title'
const NOTE_CONTENT = 'content'
const NOTE_TIME = 'time_saved'


/**
 * Connects to database. Async function that waits for completion.
 */
exports.connect = async () => {
    await dbClient.connect()
        .then(() => {
            console.log('Connected to database.')
        })
        .catch(err => {
            console.log('Failed to connect to database\n' + err)
            throw new Error()
        })
}

/**
 * Disconnects from databse. Async function that waits for completion.
 */
exports.disconnect = async () => {
    await dbClient.end()
        .then(() => {
            console.log('Disconnected from database.')
        })
        .catch(err => {
            console.log('Failed to disconnect from databse\n' + err)
        })
}

/**
 * Creates note table is it hasn't been already. Async function that waits for completion.
 */
exports.notesTable = async () => {
    // single line to keep style consistency even though it is 3 times the recomended length
    // this query returns nothing
    await dbClient.query(`create table if not exists ${TABLE_NOTE} (${NOTE_ID} text not null, ${NOTE_USER} text not null, ${NOTE_TITLE} text not null, ${NOTE_CONTENT} text not null, ${NOTE_TIME} int8 not null, primary key (${NOTE_ID}, ${NOTE_USER}))`)
}

//notes CRUD

/**
 * Insert a single note
 * @param {string} id Note id
 * @param {string} user User id
 * @param {string} title Note title
 * @param {string} content Note content
 * @param {number} time Time saved in milliseconds
 * @returns {Promise} {id: string, status: boolean}
 */
exports.createNote = (id, user, title, content, time) => {
    return dbClient.query(`insert into ${TABLE_NOTE} (${NOTE_ID}, ${NOTE_USER}, ${NOTE_TITLE}, ${NOTE_CONTENT}, ${NOTE_TIME}) values ($1, $2, $3, $4, $5)`, [id, user, title, content, time])
        .then(() => {
            return {id, status: true}
        })
        .catch(() => {
            return {id, status: false}
        })
}

/**
 * Insert multiples note(s)
 * @param {...{id: string, user: string, title: string, content: string, time: number}} notes Note information object(s)
 * @param {string} notes.id Note id
 * @param {string} notes.user User id
 * @param {string} notes.title Note title
 * @param {string} notes.content Note content
 * @param {number} notes.time Time saved in milliseconds
 * @returns {Promise} Returns Object[{id: string, status: boolean}]
 */
exports.createNotes = (...notes) => {
    // How it works
    // Promise all requires the function to be called, so not [asyncFunc] but [asyncFunc()]
    // It only finishes when the asyncFunc is complete
    // mapped is an array of promises already called, essenitally dbclient.query()
    // awaiting Promise all makes sure that all calls are finished before returning to stack

    const mapped = notes.map(({id, user, title, content, time}) => {
        return exports.createNote(id, user, title, content, time)
    })

    // does it return its value? - yes i guess
    return Promise.all(mapped)
} 

/**
 * Return a single note object as an array. Empty array means no result found.
 * @param {string} id Note id
 * @param {string} user User id
 * @returns {Promise} Object[]|null
 */
exports.getNote = (id, user) => {
    return dbClient.query(`select * from ${TABLE_NOTE} where ${NOTE_ID}=$1 and ${NOTE_USER}=$2`, [id, user])
        .then(res => {
            return res.rows
        })
        .catch(err => {
            return null
        })
}

/**
 * Return all notes created by user
 * @param string user id
 * @returns {Promise} Object[]|null
 */
exports.getUserNotes = (user) => {
    return dbClient.query(`select * from ${TABLE_NOTE} where ${NOTE_USER}=$1`, [user])
        .then(res => {
            return res.rows
        })
        .catch(err => {
            return null
        })
}

/**
 * Update a single note WITHOUT time check
 * @param {string} id Note id
 * @param {string} user User id
 * @param {string} title Note title
 * @param {string} content Note content
 * @param {number} time Time saved in milliseconds
 * @returns {Promise} number|boolean
 */
exports.updateNote = (id, user, title, content, time) => {
    return dbClient.query(`update ${TABLE_NOTE} set ${NOTE_TITLE}=$1, ${NOTE_CONTENT}=$2, ${NOTE_TIME}=$3 where ${NOTE_ID}=$4 and ${NOTE_USER}=$5`, [title, content, time, id, user])
        .then(res => {
            return {id, status: true}
        })
        .catch(err => {
            return {id, status: false}
        })
}

/**
 * Update multiples note(s) WITHOUT time check
 * @param {...{id: string, user: string, title: string, content: string, time: number}} notes Note information object(s)
 * @param {string} notes.id Note id
 * @param {string} notes.user User id
 * @param {string} notes.title Note title
 * @param {string} notes.content Note content
 * @param {number} notes.time Time saved in milliseconds
 * @returns {Promise} Returns Object[{id: string, status: boolean}]
 */
exports.updateNotes = (...notes) => {
    const mapped = notes.map(({id, user, title, content, time}) => {
        return exports.updateNote(id, user, title, content, time)
    })

    return Promise.all(mapped)
}

/**
 * Delete a single note
 * @param {string} id Note id
 * @param {string} user User id
 * @returns {Promise} number|boolean
 */
exports.deleteNote = (id, user) => {
    return dbClient.query(`delete from ${TABLE_NOTE} where ${NOTE_ID}=$1 and ${NOTE_USER}=$2`, [id, user])
        .then(res => {
            return {id, status: true}
        })
        .catch(err => {
            return {id, status: false}
        })
}

/**
 * Deletes multiple note(s)
 * @param  {...notes} notes Note information object(s)
 * @param {string} notes.id Note id
 * @param {string} notes.user User id
 * @returns {Promise} Returns Object[]
 */
exports.deleteNotes = (...notes) => {
    const mapped = notes.map(({id, user}) => {
        return exports.deleteNote(id, user)
    })

    return Promise.all(mapped)
}