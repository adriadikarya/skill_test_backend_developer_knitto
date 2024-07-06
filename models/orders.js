'use strict';

const {
    Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        static associate(models) {
            Orders.belongsTo(models.Customers, {foreignKey: 'customerNumber', as: 'customers'});
        }
    }
    Orders.init({
        orderNumber: {type: DataTypes.INTEGER, primaryKey: true},
        orderDate: DataTypes.DATE,
        requiredDate: DataTypes.DATE,
        shippedDate: DataTypes.DATE,
        status: DataTypes.STRING,   
        comment: DataTypes.TEXT,   
        customerNumber: DataTypes.INTEGER,   
    }, {
        sequelize,
        modelName: 'Orders',
        freezeTableName: true,
        tableName: 'orders',
        timestamps: false,
        underscored: false,
    });


    return Orders;
};
