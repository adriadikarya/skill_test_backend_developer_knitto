'use strict';

const {
    Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        static associate(models) {
        }
    }

    Products.init({
        productCode: {type: DataTypes.STRING, primaryKey: true},
        productName : DataTypes.STRING,
        productLine : DataTypes.STRING,
        productScale : DataTypes.INTEGER,
        productVendor : DataTypes.STRING,
        productDescription : DataTypes.TEXT,
        quantityInStock : DataTypes.SMALLINT,
        buyPrice : DataTypes.DECIMAL,
        MSRP : DataTypes.DECIMAL,
    }, {
        sequelize,
        modelName: 'Products',
        freezeTableName: true,
        tableName: 'products',
        timestamps: false,
        underscored: false,
    });


    return Products;
};
