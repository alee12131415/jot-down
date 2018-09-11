const router = require('express').Router()
const bodyparser = require('body-parser')
const {deleteUser} = require('../middleware/user.middleware')
const {verifyToken} = require('../middleware/util.middleware')

const jsonParser = bodyparser.json()

router.use(verifyToken, jsonParser)

router.delete('/', deleteUser)

module.exports = router