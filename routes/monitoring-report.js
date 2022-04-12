const express = require('express')
const { RegisterReport, getReport, updateReport, getReportByUser, getComparison, deleteReport,deleteAllReport,RegisterManyReport } = require('../controller/monitoring-report')
const { Auth } = require('../middleware/auth')

const router = new express.Router()

router.post('/register-report', Auth, RegisterReport)

router.post('/register-many-report', Auth, RegisterManyReport)

router.get('/get-reports', getReport)

router.get('/get-user-reports', getReportByUser)

router.patch('/update-report', Auth, updateReport)

router.get('/comparison', getComparison)

router.delete('/remove-report', Auth, deleteReport)

router.delete('/remove-allreport', Auth, deleteAllReport)

module.exports = router
