import mongoose from 'mongoose'

export interface IUsuario extends mongoose.Document {
  nomeusuario: String
  primeiroNome: String
  segundoNome: String
  email: String
  senha: String
}
