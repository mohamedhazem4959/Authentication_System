const mongodb = require('mongoose')
const userSchema = require('../model/s-auth')
const BadRequest = require('../errors/badReq')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
class Authentication {
    async register(req, res) {
        const { name, email, password } = req.body;
        const vaildEmail = await userSchema.findOne({ email });
        if (vaildEmail) {
            throw new BadRequest('this email is already registerd!')
        }
        const user = await userSchema.create({ ...req.body })
        const token = userSchema.createJWT()
        res.status(StatusCodes.CREATED).json({ name: user.name, token })
    }
}