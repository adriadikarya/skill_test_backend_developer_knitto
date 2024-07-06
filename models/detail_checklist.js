'use strict';

const {
    Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class DetailChecklist extends Model {
        static associate(models) {
        }
    }
    DetailChecklist.init({
        checklist_item_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        checklist_item_name: DataTypes.STRING,
        checklist_id: DataTypes.INTEGER,
        status_checked: DataTypes.BOOLEAN          
    }, {
        sequelize,
        modelName: 'DetailChecklist',
        freezeTableName: true,
        tableName: 'detail_checklist',
        timestamps: false,
        underscored: true,
    });


    return DetailChecklist;
};
