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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await userSchema.create({
            name,
            email,
            password: hashedPassword
        });
        const token = jwt.sign({
            //payload
            user: user.name,
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )
        res.status(StatusCodes.CREATED).json({ name: user.name, token })
    }
}