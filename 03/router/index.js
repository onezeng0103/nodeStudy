const express = require('express')
const router = express.Router()
router.use('/user', require('./modules/user'))
module.exports = router
