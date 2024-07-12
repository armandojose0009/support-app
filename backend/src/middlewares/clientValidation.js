const Joi = require('joi');

const clientSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().required(),
  address: Joi.string().required(),
  isActive: Joi.boolean()
}).unknown(true);

const validateClient = (req, res, next) => {
  const { error } = clientSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateClient;
