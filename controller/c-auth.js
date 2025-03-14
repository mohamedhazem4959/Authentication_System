const mongodb = require('mongoose')
const userSchema = require('../model/s-auth')
const BadRequest = require('../errors/badReq')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Unauthorized = require('../errors/unauth')
class Authentication {
    //register functin
    async register(req, res) {
        const vaildEmail = await userSchema.findOne({ email });
        if (vaildEmail) {
            throw new BadRequest('this email is already registerd!')
        }
        const user = await userSchema.create({ ...req.body })
        const token = userSchema.createJWT()
        res.status(StatusCodes.CREATED).json({ name: user.name, token })
    }
    //login function
    async login(req,res){
        const {email , password} = req.body;
        if (!email || !password) {
            throw new BadRequest('please provid email and password')
        }
        const findEmail = await userSchema.findOne({ email })
        if (!findEmail) {
            throw new Unauthorized('Invalid credentials')
        }
        const isMatch = await userSchema.comparePassword(password)
        if (!isMatch) {
            throw new Unauthorized('Invalid credentials')
        }
        const token = userSchema.createJWT()
        res.status(StatusCodes.OK).json({ name: user.name, token })
    }
}

module.exports = Authentication;
