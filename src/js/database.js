import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import shortid from 'shortid'
import moment from 'moment'

const adapter = new LocalStorage('jot.json')
const db = low(adapter)

db.defaults({notes: []}).write()

/*
id: string
title: string
text: string
user: string
time: long (in milli)
*/

class dbHelper {
    constructor(db) {
        this.db = db
    }

    addNote(title, text, user) {
        const id = shortid.generate()
        const time = moment().valueOf()
        this.db.get('notes').push({id, title, text, user, time}).write()
        return id
    }

    updateNote(id, title, text, user) {
        const time = moment().valueOf()
        this.db.get('notes').find({id}).assign({id, title, text, user, time}).write()
    }

    deleteNote(id) {
        this.db.get('notes').remove({id}).write()
    }

    getNote(id) {
        return this.db.get('notes').find({id}).value()
    }

    getNotes() {
        return this.db.get('notes').value()
    }
}

export default new dbHelper(db)