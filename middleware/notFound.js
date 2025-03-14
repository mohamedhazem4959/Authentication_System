const notFound = (req,res)=>{
    return res.status(404).json({msg: 'route is not found'})
}

module.exports = notFound;