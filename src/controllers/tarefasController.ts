/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
import { Request, Response, NextFunction } from 'express'
import * as halson from 'halson'
import * as _ from 'lodash'

import { strict } from 'assert'
import { logger } from '../common/logging'
import { formatOutput } from '../util/formatApi'

import { UsuarioModel } from '../database/schemas/usuario'
import { TarefaModel } from '../database/schemas/tarefas'

export function listar(req: Request, res: Response, next: NextFunction) {
  const limit: number = Number(req.query.limit) || 0
  const offset: number = Number(req.query.offset) || 0

  TarefaModel.find({}, null, { skip: offset, limit }).then(tarefas => {
    if (tarefas) {
      tarefas = tarefas.map(tarefa => {
        return halson(tarefa)
          .addLink('self', `/tarefas/${tarefa?.id}`)
          .addLink('usuario', { href: `/usuarios/${tarefa.idUsuario}` })
      })
    }
    return formatOutput(res, tarefas, 200, 'tarefa')
  })
}

export function adicionar(req: Request, res: Response, next: NextFunction) {
  const { idUsuario } = req.body

  UsuarioModel.findById(idUsuario, (_err, usuario) => {
    if (!usuario) {
      return res.status(404).send()
    }
    const novaTarefa = new TarefaModel(req.body)
    novaTarefa.save((_err, tarefa) => {
      tarefa = halson(tarefa.toJSON())
        .addLink('self', `/tarefas/${tarefa.id}`)
        .addLink('usuarios', { href: `/usuarios/${tarefa.idUsuario}` })
      return formatOutput(res, tarefa, 201, 'tarefa')
    })
  })
}

export function listarPorId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  TarefaModel.findById(id, (_err, tarefa) => {
    if (!tarefa) {
      return res.status(404).send()
    }
    logger.info(tarefa)
    tarefa = halson(tarefa).addLink('self', `/tarefas/${tarefa?.id}`)
    return formatOutput(res, tarefa, 200, 'tarefa')
  })
}

export function remover(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  TarefaModel.findById(id, (_err, tarefas) => {
    if (!tarefas) {
      return res.status(404).send()
    }
    return tarefas.remove(_err => res.status(204).send())
  })
}
// export function listarPorTipo(req: Request, res: Response, next: NextFunction) {
//   const status = req.query.status

//   TarefaModel.find({ status }, (err, tarefas) => {
//     tarefas = _.groupBy(tarefas, 'idUsuario')
//     return formatOutput(res, tarefas, 200, 'tarefa_tipo')
//   })
// }
