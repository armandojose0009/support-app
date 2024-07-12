const Joi = require('joi');

const employeeValidationSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(50).required()
    .messages({
      'string.empty': 'First name is required',
      'string.min': 'First name must be at least 1 character long',
      'string.max': 'First name must not exceed 50 characters',
      'any.required': 'First name is required'
    }),

  lastName: Joi.string().trim().min(1).max(50).required()
    .messages({
      'string.empty': 'Last name is required',
      'string.min': 'Last name must be at least 1 character long',
      'string.max': 'Last name must not exceed 50 characters',
      'any.required': 'Last name is required'
    }),

  email: Joi.string().email().trim().required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),

  phoneNumber: Joi.string().trim().pattern(/^[0-9+\-\s()]*$/).allow('').max(20)
    .messages({
      'string.pattern.base': 'Phone number can only contain digits, spaces, and the characters + - ( )',
      'string.max': 'Phone number must not exceed 20 characters'
    }),

  isActive: Joi.boolean()
    .messages({
      'boolean.base': 'isActive must be a boolean'
    })
}).unknown(true);

const validateEmployee = (req, res, next) => {
    const { error } = employeeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
  
  module.exports = validateEmployee;
