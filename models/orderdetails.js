'use strict';

const {
    Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class OrderDetails extends Model {
        static associate(models) {
            OrderDetails.belongsTo(models.Orders, {foreignKey: 'orderNumber', as: 'orders'});
            OrderDetails.belongsTo(models.Products, {foreignKey: 'productCode', as: 'products'});
        }
    }
    OrderDetails.init({
        orderNumber: {type: DataTypes.INTEGER, primaryKey: true},
        productCode: {type: DataTypes.STRING, primaryKey: true},
        quantityOrdered: DataTypes.INTEGER,
        priceEach: DataTypes.DECIMAL,
        orderLineNumber: DataTypes.SMALLINT
    }, {
        sequelize,
        modelName: 'OrderDetails',
        freezeTableName: true,
        tableName: 'orderdetails',
        timestamps: false,
        underscored: false,
    });


    return OrderDetails;
};
