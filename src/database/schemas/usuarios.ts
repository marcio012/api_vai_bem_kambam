import mongoose from 'mongoose'
import crypto from 'crypto'
import { IUsuario } from '../../models/usuario'

export interface UsuarioModel extends IUsuario, Document { }

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.virtual('password')
  .set((password: string) => {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(() => {
    return this._password
  })

UserSchema.path('hashed_password').validate(() => {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  authenticate(plainText: string) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword(password: string) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt() {
    return `${Math.round(new Date().valueOf() * Math.random())}`
  },
}

export default mongoose.model<UsuarioModel>('User', UserSchema)
