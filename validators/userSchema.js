const Joi = require('joi');

// Define a schema for the user object
const userSchema = Joi.object({
  id: Joi.number().integer().min(1),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  // Add more properties as needed
});

module.exports = userSchema;
