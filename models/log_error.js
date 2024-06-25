'use strict';

const {
    Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class LogError extends Model {
        static associate(models) {
        }
    }

    LogError.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        path : DataTypes.STRING,
        error : DataTypes.STRING,
        userId : DataTypes.INTEGER,
        username : DataTypes.STRING,
        body : DataTypes.STRING,
        createdAt : DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'LogError',
        freezeTableName: true,
        tableName: 'log_error',
        timestamps: false,
        underscored: true,
    });


    return LogError;
};
