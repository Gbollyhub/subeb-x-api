const express = require('express')
const { RegisterLog, getLogs, deleteLogs } = require('../controller/logs')


const router = new express.Router()

router.post('/register-log', RegisterLog)

router.get('/get-logs', getLogs)

router.delete('/clear-logs', deleteLogs)



module.exports = router