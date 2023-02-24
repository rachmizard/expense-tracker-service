import { Schema } from 'mongoose'

export default function toJSONPlugin<T>(schema: Schema<T>, options?: any) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v

      if (ret.password) {
        delete ret.password
      }

      return ret
    },
  })
}
