const {
    NotFoundError,
    NotFoundWithData,
   } = require('./exception');
const { Validator, ValidationError} = require("express-json-validator-middleware");
const LogError = require('../models').LogError;
const moment = require('moment');
const jwt = require('jsonwebtoken');

const errorHandler = (err, req, res) => {
    var bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const decode = jwt.decode(bearerToken);    
    console.error(err);
    // console.error(res);
    if (err instanceof NotFoundError){
        return res.status(400).json({
            // rc: err.status || 400,
            message: err.message
        });
    }else if (err instanceof ValidationError){
        console.log(err)
        return res.status(400).json({
            // rc: err.status || 400,
            message: err.message || "Invalid request pattern, please read the API documentation!",
            error: err.validationErrors
        });
    }else if (err instanceof NotFoundWithData){
        console.log('NotFoundWithData')
        console.log(err)
        return res.status(400).json({
            // rc: err.status || 400,
            message: err.message || "Invalid request pattern, please read the API documentation!",
            data: err.data
        });
    } else {
        let response = {
            // rc: 500,
            message: 'Internal Server Error! ' + err
            // rm: 'Internal Server Error! '
        }
        LogError.create({
            path : req.path,
            error : JSON.stringify(response),
            body : JSON.stringify(req.body),
            userId : decode.id,
            username : decode.username,
            createdAt : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        })
        return res.status(500).json(response);
    }
};

module.exports = {
    errorHandler
};