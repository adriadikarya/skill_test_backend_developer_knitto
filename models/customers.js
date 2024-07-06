'use strict';

const {
    Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class Customers extends Model {
        static associate(models) {            
        }
    }
    Customers.init({
        customerNumber: {type: DataTypes.INTEGER, primaryKey: true},
        customerName: DataTypes.STRING,
        contactLastName: DataTypes.STRING,
        contactFirstName: DataTypes.STRING,          
        phone: DataTypes.STRING,          
        addressLine1: DataTypes.STRING,          
        addressLine2: DataTypes.STRING,          
        city: DataTypes.STRING,          
        state: DataTypes.STRING,          
        postalCode: DataTypes.STRING,          
        country: DataTypes.STRING,          
        salesRepEmployeeNumber: DataTypes.INTEGER,          
        creditLimit: DataTypes.DECIMAL,          
    }, {
        sequelize,
        modelName: 'Customers',
        freezeTableName: true,
        tableName: 'customers',
        timestamps: false,
        underscored: false,
    });


    return Customers;
};
