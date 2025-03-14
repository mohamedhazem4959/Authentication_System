const {StatusCodes} = require('http-status-codes')
const customApiError = require('./customErrorHandling')
class Unauthorized extends customApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
module.exports = Unauthorized