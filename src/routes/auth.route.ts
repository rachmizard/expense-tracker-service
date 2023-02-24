import { ReqRefDefaults, ServerRoute } from '@hapi/hapi'
import Boom from '@hapi/boom'

import authController from 'controllers/auth.controller'
import { loginSchema, registerSchema } from 'schemas/auth'

import handleValidationError from 'utils/handleErrror'

const authRoutes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'POST',
    path: '/auth/login',
    options: {
      validate: {
        payload: loginSchema,
        failAction: handleValidationError,
      },
    },
    handler: authController.login,
  },
  {
    method: 'POST',
    path: '/auth/register',
    options: {
      validate: {
        payload: registerSchema,
        failAction: handleValidationError,
      },
    },
    handler: authController.register,
  },
  {
    method: 'GET',
    path: '/auth/profile',
    options: {
      auth: 'jwt',
    },
    handler: (request, h) => {
      return h.response({ user: request.auth.credentials.user })
    },
  },
]

export default authRoutes
