import Joi from 'joi'

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'string.empty': 'Email is required',
  }),
  name: Joi.string().required(),
  password: Joi.string().required(),
})

export default registerSchema
