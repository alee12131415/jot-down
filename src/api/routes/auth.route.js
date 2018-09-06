const router = require('express').Router()
const jsonParser = require('body-parser').json()
const {verifyToken} = require('../middleware/util.middleware')
const {verifyLogin} = require('../middleware/auth.middleware')

router.post('/check', verifyToken, (req, res) => {
    res.send('Authorized')
})

router.post('/login', jsonParser, verifyLogin)

module.exports = router