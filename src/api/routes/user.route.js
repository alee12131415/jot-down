const router = require('express').Router()
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const {postUser} = require('../middleware/user.middleware')

const jsonParser = bodyparser.json()

router.use(jsonParser, cookieParser())

router.post('/', postUser)

module.exports = router