const joi = require('joi');
const UserRole = require('../enumeration/UserRole');

const schemas = {
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    createUser: joi.object({
        name: joi.string().required(),
        role: joi.number().valid(...UserRole.getList()).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    getFilesData: joi.object({
        key: joi.string().required(),
    }),
    sendEmail: joi.object({
        to: joi.string().email().required(),
        subject: joi.string().required(),
        message: joi.string().required(),
    })
}

module.exports = schemas;