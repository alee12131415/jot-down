const router = require('express').Router()
const bodyparser = require('body-parser')
const {postUser} = require('../middleware/user.middleware')
const {verifyToken} = require('../middleware/util.middleware')

const jsonParser = bodyparser.json()

router.use(jsonParser)

router.post('/', postUser)
router.put('/', verifyToken, (req, res) => {res.send(true)})

module.exports = router