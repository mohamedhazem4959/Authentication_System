const mongodb = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authSchema = new mongodb.Schema({
    name:{
        type:String,
        required:[true , 'username is required'],
        maxlength: 25
    },
    email:{
        type:String,
        required:[true , 'email is required'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide a vaild email'],
        unique:true
    },
    password:{
        type:String,
        required:[true , 'password is required'],
        minlength:8
    }
})
authSchema.pre('save' , async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

authSchema.methods.createJWT = function(){

    return jwt.sign
    (
        {
            //payload
            userName: this.name,
            userID: this._id
        },
            // jwt secret
            process.env.JWT_SECRET,
            //options -> expires
        {
            expiresIn: '30d'
        }
    )
}

authSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password,this.password)
    return isMatch
}
module.exports = mongodb.model('users' , authSchema)