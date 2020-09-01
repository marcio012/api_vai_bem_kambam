import { NextFunction, Request, Response } from 'express'
import { logger } from '../common/logging'
import Usuario from '../models/usuario'

let usuariosList: Array<Usuario> = []

export const pegarUsuario = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const nomeUsuario = req.params.username
  const usuario = usuariosList.find(obj => obj.nomeUsuario === nomeUsuario)
  const httpStatusCode = usuario ? 200 : 404
  return res.status(httpStatusCode).send(usuario)
}

export const adicionarUsuario = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
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
  logger.info(`usuário cadastrado ${usuario.nomeUsuario}`)
  return res.status(201).send(usuario)
}

export const atualizarUsuario = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const nomeUsuario = req.params.username
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

  logger.info(`usuário atualizado ${user.id}`)
  usuariosList[userIndex] = user

  logger.info(`lista em memoria usuário atualizado ${usuariosList}`)
  return res.status(204).send()
}

// FIXME: Terminar esse metodo.
export const removerUsuario = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const nomeUsuario = req.params.username
  const userIndex = usuariosList.findIndex(
    item => item.nomeUsuario === nomeUsuario,
  )

  if (userIndex === -1) {
    return res.status(404).send()
  }

  usuariosList = usuariosList.filter(item => item.nomeUsuario !== nomeUsuario)

  return res.status(204).send()
}
