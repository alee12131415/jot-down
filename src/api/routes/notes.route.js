const router = require('express').Router()
const bodyparser = require('body-parser')
const {getNote, postNote, putNote, deleteNote} = require('../middleware/notes.middleware')

const jsonParser = bodyparser.json()

router.use(jsonParser)

router.get('/', getNote)
router.post('/', postNote)
router.put('/', putNote)
router.delete('/', deleteNote)

module.exports = router