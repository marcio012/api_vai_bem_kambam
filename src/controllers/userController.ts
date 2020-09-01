import { NextFunction as Next, Request as Req, Response as Res } from 'express'
import { logger } from '../common/logging'
import Usuario from '../models/usuario'
import { formatOutput } from '../util/formatApi'

let usuariosList: Array<Usuario> = []
const APPLICATION_JSON = 'application/json'

export const pegarUsuario = (
  req: Req,
  res: Res,
  _next: Next,
): Express.Request => {
  const nomeUsuario = req.params.username
  const usuario = usuariosList.find(obj => obj.nomeUsuario === nomeUsuario)
  const httpStatusCode = usuario ? 200 : 404
  return formatOutput(res, usuario, httpStatusCode, 'usuario')
}

export const adicionarUsuario = (
  req: Req,
  res: Res,
  _next: Next,
): Express.Request => {
  const usuario: Usuario = {
    id: Math.floor(Math.random() * 100) + 1,
    nomeUsuario: req.body.nomeUsuario,
    primeiroNome: req.body.primeiroNome,
    segundoNome: req.body.segundoNome,
    email: req.body.email,
    senha: req.body.senha,
  }
  usuariosList.push(usuario)
  logger.info(`usuário cadastrado ${usuario.nomeUsuario}`)
  return formatOutput(res, usuario, 201, 'usuario')
}

export const atualizarUsuario = (
  req: Req,
  res: Res,
  _next: Next,
): Express.Request => {
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

  usuariosList[userIndex] = user

  return formatOutput(res, {}, 204, 'usuario')
}

export const removerUsuario = (
  req: Req,
  res: Res,
  _next: Next,
): Express.Request => {
  const nomeUsuario = req.params.username
  const userIndex = usuariosList.findIndex(
    item => item.nomeUsuario === nomeUsuario,
  )

  if (userIndex === -1) {
    return res.format({
      json: () => {
        res.type(APPLICATION_JSON)
        res.status(404).json()
      },
    })
  }

  usuariosList = usuariosList.filter(item => item.nomeUsuario !== nomeUsuario)

  return formatOutput(res, {}, 204, 'usuario')
}
