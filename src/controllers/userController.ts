import { NextFunction, Request, Response } from 'express'
import Usuario from '../models/usuario'

const usuariosList: Array<Usuario> = []

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { nomeUsuario } = req.params
  const usuario = usuariosList.find(obj => obj.nomeUsuario === nomeUsuario)
  const httpStatusCode = usuariosList ? 200 : 404
  return res.status(httpStatusCode).send(usuariosList)
}

export const addUser = (req: Request, res: Response, next: NextFunction) => {
  const usuario: Usuario = {
    // generic random value from 1 to 100 only for tests so far
    id: Math.floor(Math.random() * 100) + 1,
    nomeUsuario: req.body.nomeUsuario,
    primeiroNome: req.body.primeiroNome,
    segundoNome: req.body.segundoNome,
    email: req.body.email,
    senha: req.body.senha,
  }
  usuariosList.push(usuario)
  return res.status(201).send(usuario)
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { nomeUsuario } = req.params
  const userIndex = usuariosList.findIndex(
    item => item.nomeUsuario === nomeUsuario,
  )

  if (userIndex === -1) {
    return res.status(404).send()
  }

  const user = usuariosList[userIndex]
  user.nomeUsuario = req.body.nomeUsuario || user.nomeUsuario
  user.primeiroNome = req.body.primeiroNome || user.primeiroNome
  user.segundoNome = req.body.segundoNome || user.segundoNome
  user.email = req.body.email || user.email
  user.senha = req.body.senha || user.senha

  usuariosList[userIndex] = user
  return res.status(204).send()
}

// FIXME: Terminar esse metodo.
export const removeUser = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params
  const userIndex = users.findIndex(item => item.username === username)

  if (userIndex === -1) {
    return res.status(404).send()
  }

  users = users.filter(item => item.username !== username)

  return res.status(204).send()
}
