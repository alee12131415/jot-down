const router = require('express').Router()

router.use('/notes', require('./notes.route'))
router.use('/user', require('./user.route'))
router.use('/auth', require('./auth.route'))

router.use(require('../middleware/util.middleware').catchError)

module.exports = router