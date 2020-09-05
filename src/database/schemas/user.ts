import mongoose, { Document, model, Schema, Model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { User } from '../../models/User'

export interface UserModel extends Omit<User, '_id'>, Document { }

export const userSchema: Schema = new mongoose.Schema(
  {
    username: { type: String, required: true, lowercase: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
      required: 'Email is required',
    },
    password: {
      type: String,
      required: 'Password is required',
    },
    // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    created: {
      type: Date,
      default: Date.now(),
    },
    updated: Date,
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  },
)

userSchema.plugin(uniqueValidator)

export const UserModel: Model<UserModel> = mongoose.model('User', userSchema)
