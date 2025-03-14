const {StatusCodes} = require('http-status-codes')
const customApiError = require('./customErrorHandling')
class notFound extends customApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}
module.exports = notFound