const express = require('express')
const { RegisterAllocation, getAllocation, getAllocationByYear, deleteAllocation } = require('../controller/allocation')
const { Auth } = require('../middleware/auth')

const router = new express.Router()

router.post('/register-allocation', Auth, RegisterAllocation)

router.get('/get-allocation-by-year', getAllocationByYear)

router.get('/get-allocation', getAllocation)

router.delete('/remove-allocation', Auth, deleteAllocation)







module.exports = router