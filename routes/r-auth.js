const express = require('express')
const route = express.Router()


route.route('/register').post()
route.route('login').post()
module.exports = route;