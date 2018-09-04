const router = require('express').Router()
const bodyparser = require('body-parser')
const {createUser} = require('../middleware/user.middleware')

const jsonParser = bodyparser.json()

router.use(jsonParser)

router.post('/', createUser)

module.exports = router