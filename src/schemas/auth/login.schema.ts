import Joi from 'joi'

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().required(),
})

export default loginSchema
