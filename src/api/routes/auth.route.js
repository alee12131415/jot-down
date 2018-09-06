const router = require('express').Router()
const {verifyToken} = require('../middleware/util.middleware')

router.post('/check', verifyToken, (req, res) => {
    res.send('Authorized')
})

module.exports = router