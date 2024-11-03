const joi = require('joi');

const transactionValidation  = joi.object({
    sourceAccountId: joi.number().required(),
    destinationAccountId: joi.number().required(),
    amount: joi.number().required().greater(0)
});

module.exports = transactionValidation;