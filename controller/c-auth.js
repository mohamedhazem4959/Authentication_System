const mongodb = require('mongoose')
const userSchema = require('../model/s-auth')
const BadRequest = require('../errors/badReq')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Unauthorized = require('../errors/unauth')
//authentication class
class Authentication {
    //register functin
    async register(req, res) {
        const { email } = req.body;
        const vaildEmail = await userSchema.findOne({ email });
        if (vaildEmail) {
            throw new BadRequest('this email is already registerd!')
        }
        const user = await userSchema.create({ ...req.body })
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({ name: user.name, token })
    }
    //login function
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequest('please provid email and password')
        }
        const user = await userSchema.findOne({ email })
        if (!user) {
            throw new Unauthorized('Invalid credentials')
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            throw new Unauthorized('Invalid credentials')
        }
        const token = user.createJWT()
        res.status(StatusCodes.OK).json({ name: user.name, token })
    }
}

module.exports = new Authentication;
