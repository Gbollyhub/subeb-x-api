const express = require('express')
const { RegisterReport, getReport, updateReport, getReportByUser, getComparison, deleteReport,deleteAllReport,RegisterManyReport, RegisterUploadYear, getUploadYear, deleteUploadYear } = require('../controller/monitoring-report')
const { Auth } = require('../middleware/auth')

const router = new express.Router()

router.post('/register-report', Auth, RegisterReport)

router.post('/register-many-report', Auth, RegisterManyReport)

router.post('/register-upload-year', Auth, RegisterUploadYear)

router.get('/get-upload-year', getUploadYear)

router.get('/get-reports', getReport)

router.get('/get-user-reports', getReportByUser)

router.patch('/update-report', Auth, updateReport)

router.get('/comparison', getComparison)

router.delete('/remove-report', Auth, deleteReport)

router.delete('/remove-allreport', Auth, deleteAllReport)

router.delete('/remove-report-year', Auth, deleteUploadYear)

module.exports = router
