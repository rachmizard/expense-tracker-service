import Boom from '@hapi/boom'

import { IUser } from 'models/user.model'
import userService from './user.service'

async function register(payload: IUser) {
  const user = await userService.createUser(payload)
  const token = user.generateAuthToken()

  return token
}

async function login(payload: Pick<IUser, 'email' | 'password'>) {
  const user = await userService.findUserByEmail(payload.email)
  if (!user) throw Boom.notFound('User not found on our database')

  const isPasswordMatch = user.comparePassword(payload.password)
  if (!isPasswordMatch)
    throw Boom.badRequest('Invalid password, please try again')

  const token = user.generateAuthToken()

  return {
    token,
    user,
  }
}

export const authService = {
  register,
  login,
}
