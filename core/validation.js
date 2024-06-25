const { Validator, ValidationError } = require("express-json-validator-middleware");

const validator = new Validator({allErrors: true});
const validate = validator.validate;


const createCifPersonalSchema = {
    type: 'object',
    required: ['branchId', 'fullName', 'aliasName', 'address', 'rt', 'rw', 'villageName', 'districtName','cityId','provinceId','motherName', 'birthPlace','birthDate','religionId','countryId','residenceId','citizenId','phoneNo','mobileNo','email','identityId','identityNo','isIdentityExpired','educationId','maritalId','sexId','isDeceased','isPriority'],
    properties: {
        branchId: {
            type: ['integer','string']
        },
        fullName: {
            type: ['integer','string']
        },
        aliasName: {
            type: ['integer','string']
        },
        address: {
            type: ['integer','string']
        },
        rt: {
            type: ['integer','string']
        },
        rw: {
            type: ['integer','string']
        },
        villageName: {
            type: ['integer','string']
        },
        districtName: {
            type: ['integer','string']
        },
        cityId: {
            type: ['integer','string']
        },
        provinceId: {
            type: ['integer','string']
        },
        motherName: {
            type: ['integer','string']
        },
        birthPlace: {
            type: ['integer','string']
        },
        birthDate: {
            type: ['integer','string']
        },
        religionId: {
            type: ['integer','string']
        },
        countryId: {
            type: ['integer','string']
        },
        residenceId: {
            type: ['integer','string']
        },
        citizenId: {
            type: ['integer','string']
        },
        phoneNo: {
            type: ['integer','string']
        },
        mobileNo: {
            type: ['integer','string']
        },
        email: {
            type: ['integer','string']
        },
        identityId: {
            type: ['integer','string']
        },
        identityNo: {
            type: ['integer','string']
        },
        isIdentityExpired: {
            type: ['boolean', 'string']
        },
        educationId: {
            type: ['integer','string']
        },
        maritalId: {
            type: ['integer','string']
        },
        sexId: {
            type: ['integer','string']
        },
        isDeceased: {
            type: ['boolean', 'string']
        },
        isPriority: {
            type: ['boolean', 'string']
        },
        incomeId: {
            type: ['integer','string']
        },
        jobId: {
            type: ['integer','string']
        },
        npwpNo: {
            type: ['integer','string']
        },
        relationId: {
            type: ['integer','string']
        },
    }
}


module.exports = {
    createCifPersonalSchema
};