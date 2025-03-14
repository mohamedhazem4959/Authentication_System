const mongodb = require('mongoose')
const connectDB = (url)=>{
    return mongodb.connect(url)
}
module.exports = connectDB