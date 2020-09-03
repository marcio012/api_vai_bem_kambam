import { Document, Model, model, Schema } from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
import { TarefasSchema } from './tarefas'
import Usuario from '../../models/usuario'

export interface UsuarioModel extends Usuario, Document { }

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
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  tarefas: [{ type: Schema.Types.ObjectId, ref: 'Tarefa' }],
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
