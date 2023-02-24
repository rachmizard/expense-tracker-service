import hapiAuthJwt from '@hapi/jwt'
import { Model, model, Schema, SchemaTypes } from 'mongoose'

import toJSONPlugin from './plugins/toJSON.plugin'

import BcryptConfig from 'utils/bcrypt'
import { config } from 'utils/config'

export interface IUser {
  name: string
  email: string
  password: string
}

type UserMethods = {
  comparePassword: (password: string) => boolean
  generateAuthToken: () => string
}

interface UserModel extends Model<IUser, {}, UserMethods> {
  isEmailTaken: (email: string) => Promise<boolean>
}

const userSchema = new Schema<IUser, UserModel, UserMethods>(
  {
    email: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)
        },
      },
      trim: true,
    },
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  {
    statics: {
      isEmailTaken: async function (email: string) {
        const user = await this.findOne({
          email,
        }).exec()

        return !!user
      },
    },
  }
)

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = BcryptConfig.hash(this.password)
  }

  next()
})

userSchema.methods.comparePassword = function (password: string) {
  return BcryptConfig.compare(password, this.password)
}

userSchema.methods.generateAuthToken = function () {
  const token = hapiAuthJwt.token.generate(
    {
      aud: 'urn:audience:test',
      iss: 'urn:issuer:test',
      sub: this._id,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15,
    },
    {
      key: config.jwtSecret as string,
      algorithm: 'HS256',
    }
  )

  return token
}

userSchema.plugin(toJSONPlugin)

const User = model<IUser, UserModel>('User', userSchema)

export default User
