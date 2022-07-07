const express = require('express')
const { Register, Login, updateUser, Logout ,getAllUsers, deleteUser} = require('../controller/users')
const { Auth } = require('../middleware/auth')

const router = new express.Router()

router.post('/create-account', Register)

router.get('/get-users', getAllUsers)

router.post('/login', Login)

router.get('/logout',Auth, Logout)

router.patch('/update-account',Auth, updateUser)

router.delete('/delete-account',Auth, deleteUser)

module.exports = router