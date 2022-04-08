const express = require('express')
const { RegisterBreakdown, getBreakdown, deleteBreakdwon } = require('../controller/breakdown')
const { Auth } = require('../middleware/auth')

const router = new express.Router()

router.post('/register-breakdown', Auth, RegisterBreakdown)

router.get('/get-breakdown', getBreakdown)


router.delete('/remove-breakdown', Auth, deleteBreakdwon)





module.exports = router