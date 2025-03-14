class CustonApiError extends Error{
    constructor(messge) {
        super(messge)
    }
}
module.exports = CustonApiError