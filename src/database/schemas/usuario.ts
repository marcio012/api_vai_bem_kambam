import { Document, Model, model, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { IUsuario } from '../../models/usuario'

export interface UsuarioModel extends IUsuario, Document { }

export const UsuarioSchema: Schema = new Schema({
  nomeusuario: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  primeiroNome: String,
  segundoNome: String,
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
})

UsuarioSchema.plugin(uniqueValidator)

export const UsuarioModel: Model<UsuarioModel> = model<UsuarioModel>(
  'Usuario',
  UsuarioSchema,
)
