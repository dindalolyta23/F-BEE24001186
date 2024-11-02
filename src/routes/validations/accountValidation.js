const joi = require('joi');

const accountValidation  = joi.object({
    userId : joi.number().required(),
    balance : joi.number().required(),
    bankName : joi.string().required(),
    bankAccountNumber : joi.string().required()
})

module.exports = accountValidation