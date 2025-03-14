const express = require('express')
const route = express.Router()

const Authentication = require('../controller/c-auth.js')

route.post('/register', Authentication.register)
route.post('/login', Authentication.login)

module.exports = route