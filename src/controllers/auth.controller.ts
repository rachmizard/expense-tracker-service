import { ReqRefDefaults, Request, ResponseToolkit } from '@hapi/hapi'

import { IUser } from 'models/user.model'
import { authService } from 'services/auth.service'

async function register(request: Request<ReqRefDefaults>, h: ResponseToolkit) {
  const response = await authService.register(request.payload as IUser)
  return h
    .response({
      token: response,
    })
    .code(201)
}

async function login(request: Request<ReqRefDefaults>, h: ResponseToolkit) {
  const response = await authService.login(request.payload as IUser)

  return h
    .response({
      token: response.token,
      user: response.user,
    })
    .code(501)
}

const authController = {
  register,
  login,
}

export default authController
