import { Document, Schema, Model, model } from 'mongoose'
import Usuario from '../../models/usuario'

export interface UsuarioModel extends Usuario, Document { }

export const UsuarioSchema: Schema = new Schema({
  nomeUsuario: String,
  primeiroNome: String,
  segundoNome: String,
  email: String,
  senha: String,
})

export const UsuarioModel: Model<UsuarioModel> = model<UsuarioModel>(
  'Usuario',
  UsuarioSchema,
)
