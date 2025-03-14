const {StatusCodes} = require('http-status-codes')
const customApiError = require('./customErrorHandling')
class BadRequest extends customApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}
module.exports = BadRequest