'use strict';

const {
    Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class HeaderChecklist extends Model {
        static associate(models) {
        }
    }
    HeaderChecklist.init({
        checklist_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        checklist_name: DataTypes.STRING,           
    }, {
        sequelize,
        modelName: 'HeaderChecklist',
        freezeTableName: true,
        tableName: 'header_checklist',
        timestamps: false,
        underscored: true,
    });


    return HeaderChecklist;
};
