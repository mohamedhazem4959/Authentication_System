require('express-async-errors')
require('dotenv').config()
const express = require('express');
const app = express()
//middleware
const notFound = require('./middleware/notFound.js')
const errorHandling = require('./middleware/errorHandling.js')
//import route
const route = require('./routes/r-auth.js')
//import connectDB function
const connectDB = require('./connectDB.js') 
//port
const port = process.env.PORT || 5000
//mongo url
const url = process.env.MONGO_URL

//body parase
app.use(express.json())

//route
app.use('/api/v1/auth' , route)

//middleware
app.use(errorHandling)
app.use(notFound)



const start = async()=>{
    try {
        await connectDB(url)
        app.listen(port , console.log(`the server is listing on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()