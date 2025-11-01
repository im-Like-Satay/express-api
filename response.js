const response = (statusCode, data, message, res) => { 
    res.status(statusCode).json({
       payload: {
        message: message,
        status_code: statusCode,
        data: data
       },
       
       pagination: {
        next: "",
        prev: "",
        limit: "",
       }
    })
}

module.exports = response
