const router = require('express').Router()

router.use('/notes', require('./notes.route'))

module.exports = router