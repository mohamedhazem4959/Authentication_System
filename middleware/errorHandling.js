const customApiError = require('../errors/customErrorHandling')
const errorHandling = (err , req ,res , next)=>{
    if (err instanceof customApiError) {
        res.status(err.statusCode).json({msg: err.message})
    }
    else{
        res.status(500).json({msg: err.message})
    }
}
module.exports = errorHandling