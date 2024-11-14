const joi = require('joi');


const ticketSchema = joi.object({
   subject: joi.string().required(),
   deviceType: joi.string().required(),
   issueType: joi.string().required(),
   phoneNumber: joi.string().required(),
});

module.exports = {ticketSchema};