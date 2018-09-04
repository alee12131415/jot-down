const router = require('express').Router()

router.use('/notes', require('./notes.route'))
router.use('/user', require('./user.route'))

module.exports = router