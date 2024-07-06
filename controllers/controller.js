const route = require('express').Router();
const jwt = require('jsonwebtoken');
const dd = require('dump-die');
const {
    NotFoundError,
    ForbiddenError,
    CodeError
} = require('../exception/business-exceptions');
const {
    customer_numbers_classic_cars_query,    
} = require('../query/query');


const customer_numbers_classic_cars = async(req, res, next) => {
    try{
        let data = await customer_numbers_classic_cars_query();
        return res.status(200).json(data);
    }catch(e){
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                message: e.message,
            });
        } else if (e instanceof ForbiddenError) {
            return res.status(403).json({            
                message: e.message
            });
        } else {
            return res.status(500).json({
                message: 'Internal Server Error! ' + e
            });
        }
    }
}

module.exports = {
    customer_numbers_classic_cars
};