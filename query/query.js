const Customers = require('../models').Customers;
const OrderDetails = require('../models').OrderDetails;
const Orders = require('../models').Orders;
const Products = require('../models').Products;
const { Op } = require("sequelize");
const { sequelize } = require('../models');

const customer_numbers_classic_cars_query = (where, attributes, include) => {    
    if (attributes === undefined) {
        attributes = {
            exclude : []
        }
    }

    return OrderDetails.findAll({
        where: where,   
        attributes: {
            exclude: [
                'orderNumber', 'productCode', 'quantityOrdered', 'priceEach', 'orderLineNumber'
            ],
            include: [
                [sequelize.col('orders->customers.customerNumber'), 'customerNumber'],
                [sequelize.col('orders->customers.customerName'), 'customerName'],
            ],
        },                                 
        include: [
            {                
                model: Orders,
                as: 'orders',     
                attributes: [],         
                include: [
                    {
                        model: Customers,
                        as: 'customers',
                        attributes: [], 
                        required: true                                        
                    }
                ],   
                required: true,                             
            },     
            {
                model: Products,   
                as: 'products', 
                attributes: [], 
                required: true,                                             
            }            
        ],        
        group: [[sequelize.col('orders->customers.customerNumber'), 'customerNumber'],
        [sequelize.col('orders->customers.customerName'), 'customerName']]
    })    
}

module.exports = {
    customer_numbers_classic_cars_query
};
