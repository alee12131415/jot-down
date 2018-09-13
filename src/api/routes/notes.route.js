const router = require('express').Router()
const bodyparser = require('body-parser')
const {getNote, postNote, putNote, deleteNote, syncNotes} = require('../middleware/notes.middleware')
const {verifyToken} = require('../middleware/util.middleware')

const jsonParser = bodyparser.json()

router.use(jsonParser, verifyToken)

router.get('/', getNote)
router.post('/', postNote)
router.put('/', putNote)
router.delete('/', deleteNote)
router.post('/sync', syncNotes)

module.exports = router