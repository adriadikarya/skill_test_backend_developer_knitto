const moment = require('moment');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(gConfig.database.db, gConfig.database.username, gConfig.database.password, gConfig.database);
const { Op, QueryTypes } = require("sequelize");
const {
    toSnakeCase,
    toCamelCase,
    padWithZero,
} = require('./converter');

const generateAccNo = async (type, branch_code, product_code, sub_product_code) => {

            let concat = `${branch_code}${product_code}${sub_product_code}`
            let acc_no = ''; 
            let max_cif = {};
    switch(type){
        case 1:
            max_cif = await sequelize.query(`select max(acc_no)::NUMERIC as value
                            from master_saving 
                            where left(acc_no, 7) = :concat limit 1`, 
                    { replacements: { concat: concat }, type: QueryTypes.SELECT, logging: console.log });
            if (max_cif == null || max_cif[0].value == null) {
                acc_no = `${concat}0000000`
            }else{
                let no = max_cif[0].value.substring(7, 16)
                no = await padWithZero(parseInt(no) + 1, 7)
                acc_no = `${concat}${no}`
            }
        break;
        case 2:
            // let concat = `${branch_code}${product_code}${sub_product_code}`
            // let acc_no = ''; 
            max_cif = await sequelize.query(`select max(acc_no)::NUMERIC as value
                            from master_murabahah 
                            where left(acc_no, 7) = :concat limit 1`, 
                    { replacements: { concat: concat }, type: QueryTypes.SELECT, logging: console.log });
            if (max_cif == null || max_cif[0].value == null) {
                acc_no = `${concat}0000000`
            }else{
                let no = max_cif[0].value.substring(7, 16)
                no = await padWithZero(parseInt(no) + 1, 7)
                acc_no = `${concat}${no}`
            }
        break;
    }
    
    return acc_no;

}


module.exports = {
    generateAccNo,
};