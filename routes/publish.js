const express = require('express')
const { postPublish, getPublish, updatePublish } = require('../controller/publish')
const { Auth } = require('../middleware/auth')

const router = new express.Router()

router.post('/publish', Auth, postPublish)

router.get('/get-publish', getPublish)

router.patch('/update-publish', updatePublish)







module.exports = router