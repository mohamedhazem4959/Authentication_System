const express = require('express')
const route = express.Router()

const Authentication = require('../controller/c-auth.js')

route.route('/register').post(Authentication.register)
route.route('login').post(Authentication.login)
module.exports = route;