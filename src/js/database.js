import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import shortid from 'shortid'
import moment from 'moment'

const adapter = new LocalStorage('notes')
const db = low(adapter)

db.defaults({notes: []}).write()

/*
id: string
title: string
text: string
time: long (in milli)
*/

class dbHelper {
    constructor(db) {
        this.db = db
    }

    setNotes(notes) {
        this.db.get('notes').assign(notes).write()
    }

    addNote(title, content) {
        const id = shortid.generate()
        const time = moment().valueOf()
        this.db.get('notes').push({id, title, content, time}).write()
        return id
    }

    updateNote(id, title, content) {
        const time = moment().valueOf()
        this.db.get('notes').find({id}).assign({id, title, content, time}).write()
    }

    deleteNote(id) {
        this.db.get('notes').remove({id}).write()
    }

    getNote(id) {
        return this.db.get('notes').find({id}).value()
    }

    getNotes() {
        console.log(this.db.get('notes').value())
        return this.db.get('notes').value()
    }
}

export default new dbHelper(db)