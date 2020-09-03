import * as bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { formatOutput } from '../util/formatApi'
import errorHandler from '../helpers/dbErrorHandler'
import { logger } from '../common/logging'

import { UsuarioModel } from '../database/schemas/usuario'
import { TarefaModel } from '../database/schemas/tarefas'

// eslint-disable-next-line import/order
import halson = require('halson')

export const pegarUm = (req: Request, res: Response, next: NextFunction) => {
  const { nomeusuario } = req.params

  UsuarioModel.findOne({ nomeusuario }, (_err, usuario: UsuarioModel) => {
    if (!usuario) {
      return res.status(404).send()
    }

    usuario = usuario.toJSON()
    usuario._id = usuario._id.toString()

    usuario = halson(usuario).addLink('self', `/usuario/${usuario._id}`)
    logger.info(`Usuário ${usuario.nomeusuario} listado`)
    return formatOutput(res, usuario, 200, 'usuario')
  })
}

export const adicionar = (req: Request, res: Response, next: NextFunction) => {
  const usuario = new UsuarioModel(req.body)

  usuario.password = bcrypt.hashSync(usuario.password, 10)

  usuario.save((error, usuario) => {
    if (error) {
      return res.status(500).send(error)
    }
    usuario = halson(usuario.toJSON()).addLink('self', `/users/${usuario._id}`)
    logger.info(`Usuário ${usuario.nomeusuario} salvo na base de dados`)
    return formatOutput(res, usuario, 201, 'user')
  })
}

export const atualizar = (req: Request, res: Response, next: NextFunction) => {
  // const { nomeusuario } = req.params

  UsuarioModel.findOne(
    { nomeusuario: req.params.nomeusuario },
    (_err, usuario) => {
      if (!usuario) {
        return res.status(404).send()
      }
      usuario.nomeusuario = req.body.nomeusuario || usuario.nomeusuario
      usuario.primeiroNome = req.body.primeiroNome || usuario.primeiroNome
      usuario.segundoNome = req.body.segundoNome || usuario.segundoNome
      usuario.email = req.body.email || usuario.email
      usuario.password = req.body.password || usuario.password
      usuario.updated = req.body.updated || new Date()
      usuario.save(_err => {
        return res.status(404).send()
      })
      return formatOutput(res, usuario, 204, 'usuario')
    },
  )
}

export const remover = (req: Request, res: Response, next: NextFunction) => {
  const { nomeusuario } = req.params

  UsuarioModel.findOne({ nomeusuario }, (err, usuario) => {
    if (!usuario) {
      return formatOutput(res, {}, 404, 'Usuário não encontrado!')
    }
    usuario.remove(_err => {
      return res.status(204).send()
    })
  })
}

export function listarTarefasDoUsuario(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { idusuario } = req.params
  const limit: number = Number(req.query.limit) || 0
  const offset: number = Number(req.query.offset) || 0

  TarefaModel.find({}, null, { skip: offset, limit }).then(tarefas => {
    logger.info(tarefas)
    if (tarefas) {
      let tarefasFiltradasPorIdUsuario = tarefas.filter(function (tarefa) {
        return true
      })
      tarefasFiltradasPorIdUsuario = tarefasFiltradasPorIdUsuario.filter(
        tarefa => {
          return halson(tarefa)
            .addLink('self', { href: `/ usuarios / ${tarefa.idUsuario}` })
            .addLink('tarefas', `/ tarefas / ${tarefa?._id}`)
        },
      )
      return formatOutput(res, tarefasFiltradasPorIdUsuario, 200, 'tarefa')
    }
  })
}

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.query
  const { password } = req.query

  UsuarioModel.findOne({ username }, (err, user) => {
    if (!user) {
      return res.status(404).send()
    }

    const validate = bcrypt.compareSync(password, user.password.valueOf())

    if (validate) {
      const body = { _id: user._id, email: user.email }

      const token = jwt.sign({ user: body }, 'top_secret')

      return res.json({ token })
    }
    return res.status(401).send()
  })
}
