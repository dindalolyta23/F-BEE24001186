const joi = require('joi');

const userValidation  = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    identityType: joi.string().required(),
    identityNumber: joi.string().required(),
    address: joi.string().required(),
})

module.exports = userValidation