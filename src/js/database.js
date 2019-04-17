import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import shortid from 'shortid'

const adapter = new LocalStorage('notes')
const db = low(adapter)

db.defaults({notes: []}).write()

/*
id: string
title: string
content: string
time: number (in milli)
*/

function setNotes(notes) {
    db.set('notes', notes).write()
}

function addNote(title, content) {
    const id = shortid.generate()
    const time = Date.now()
    db.get('notes').push({id, title, content, time}).write()
    return id
}

function updateNote(id, title, content) {
    const time = Date.now()
    db.get('notes').find({id}).assign({id, title, content, time}).write()
}

function deleteNote(id) {
    db.get('notes').remove({id}).write()
}

function getNote(id) {
    return db.get('notes').find({id}).value()
}

function getNotes() {
    return db.get('notes').value()
}

function clearNotes() {
    db.set('notes', []).write()
}

export default {
    setNotes,
    addNote,
    updateNote,
    deleteNote,
    getNote,
    getNotes,
    clearNotes
}