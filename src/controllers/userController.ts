import { NextFunction as Next, Request as Req, Response as Res } from 'express'
import halson from 'halson'
import { UsuarioModel } from '../database/schemas/usuarios'
import { formatOutput } from '../util/formatApi'

import { logger } from '../common/logging'

export function pegarUsuario(req: Req, res: Res, _next: Next): void {
  const { nomeusuario } = req.params

  UsuarioModel.findOne({ nomeusuario }, (_err, usuario: UsuarioModel) => {
    if (!usuario) {
      return res.status(404).send()
    }

    let usuarioJson = usuario.toJSON()
    const idUsuario = usuario.id.toString()

    usuarioJson = halson(usuario).addLink('self', `/usuario/${idUsuario}`)
    return formatOutput(res, usuario, 200, 'usuario')
  })
}

export function adicionarUsuario(req: Req, res: Res, _next: Next): void {
  const usuarioSalvar = req.body

  const novoUsuario = new UsuarioModel(usuarioSalvar)

  novoUsuario.save((_err, usuario: UsuarioModel) => {
    // eslint-disable-next-line no-param-reassign
    usuario = halson(usuario.toJSON()).addLink('self', `/usuario/${usuario.id}`)
    return formatOutput(res, usuario, 201, 'usuario')
  })
}

export function atualizarUsuario(req: Req, res: Res, _next: Next): void {
  const nome = req.params.nomeusuario
  const nomeusuario = nome
  UsuarioModel.findOne({ nomeusuario }, (_err, usuario: UsuarioModel) => {
    if (!usuario) {
      return res.status(404).send()
    }

    usuario.nomeusuario = req.body.nomeusuario || usuario.nomeusuario
    usuario.primeiroNome = req.body.primeiroNome || usuario.primeiroNome
    usuario.segundoNome = req.body.segundoNome || usuario.segundoNome
    usuario.email = req.body.email || usuario.email
    usuario.senha = req.body.senha || usuario.senha

    usuario.save(_err => {
      return res.status(404).send()
    })

    return formatOutput(res, usuario, 204, 'usuario')
  })
}

export function removerUsuario(req: Req, res: Res, _next: Next) {
  const { id } = req.params
  const idUsuario = id

  UsuarioModel.findOne({ idUsuario: id }, (_err, usuario) => {
    if (!usuario) {
      // return res.status(404).send()
      return formatOutput(res, {}, 204, '')
    }
    return usuario.remove(_err => {
      res.status(204).send()
    })
  })
}
