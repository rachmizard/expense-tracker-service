import Boom from '@hapi/boom'
import User, { IUser } from 'models/user.model'

const findUserByEmail = async (email: string) => {
  try {
    return await User.findOne({
      email,
    }).exec()
  } catch (error) {
    throw error
  }
}

const createUser = async (user: IUser) => {
  try {
    const isEmailTaken = await User.isEmailTaken(user.email)
    if (isEmailTaken) throw Boom.badRequest('Email is already taken')

    return await User.create(user)
  } catch (error) {
    throw error
  }
}

const userService = {
  findUserByEmail,
  createUser,
}

export default userService
