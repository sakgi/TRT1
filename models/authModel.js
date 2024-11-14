// authModel.js
const Joi = require('joi');

const registrationSchema = Joi.object({
    First_Name: Joi.string().required(),     // Updated to match database field name
    Last_Name: Joi.string().required(),      // Updated to match database field name
    Email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    Mobile_Number: Joi.string().length(10).pattern(/^[0-9]+$/).required(), // Updated to match database field name
    Organization: Joi.string().required(),    // Updated to match database field name
    Circle: Joi.string().required(),          // Updated to match database field name
    Employee_ID: Joi.string().required(),     // Updated to match database field name
});

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// Forgot password schema
const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});

module.exports = {
    registrationSchema,
    loginSchema,
    forgotPasswordSchema,
};