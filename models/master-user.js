'use strict';

const {
    Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
        }
    }
    User.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        token: DataTypes.STRING,
        email: DataTypes.STRING,   
    }, {
        sequelize,
        modelName: 'User',
        freezeTableName: true,
        tableName: 'users',
        timestamps: false,
        underscored: true,
    });


    return User;
};
