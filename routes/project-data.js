const express = require('express')
const { RegisterProjectData, getProjectData, getLgeaProjectData, deleteProjects } = require('../controller/project-data')
const { Auth } = require('../middleware/auth')

const router = new express.Router()

router.post('/register-projectdata', Auth, RegisterProjectData)

router.get('/get-projectdata', getProjectData)

router.get('/get-lgea-projectdata', getLgeaProjectData)

router.delete('/remove-projects', Auth, deleteProjects)




module.exports = router