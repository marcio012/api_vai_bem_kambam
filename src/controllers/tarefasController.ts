import { NextFunction, Request, Response } from 'express'
import halson from 'halson'
import _ from 'lodash'
import { formatOutput } from '../util/formatApi'
import { UsuarioModel } from '../database/schemas/usuarios'
import { TarefasModel } from '../database/schemas/tarefas'

export function criarUmaTarefa(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { idUsuario } = req.body

  UsuarioModel.findById(idUsuario, (_err, usuario) => {
    if (!usuario) {
      return res.status(404).send()
    }
    const novaTarefa = new TarefasModel(req.body)
    novaTarefa.save((_err, tarefa) => {
      tarefa = halson(tarefa.toJSON())
        .addLink('self', `/tarefas/${tarefa.id}`)
        .addLink('usuarios', { href: `/usuarios/${tarefa.idUsuario}` })
      return formatOutput(res, novaTarefa, 201, 'tarefa')
    })
  })
}

export function listarUmaTarefas(
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const { id } = req.params

  TarefasModel.findById(id, (_err, tarefa) => {
    if (!tarefa) {
      return res.status(404).send()
    }
    tarefa = halson(tarefa).addLink('self', `/tarefas/${tarefa?.id}`)
    return formatOutput(res, tarefa, 200, 'tarefa')
  })
}
export function listarTodasTarefas(
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const limit: number = Number(req.query.limit) || 0
  const offset: number = Number(req.query.offset) || 0

  TarefasModel.find({}, null, { skip: offset, limit }).then(tarefas => {
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

export function removerTarefas(
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const id = Number(req.params.id)

  TarefasModel.findById(id, (_err, tarefas) => {
    if (!tarefas) {
      return res.status(404).send()
    }
    return tarefas.remove(_err => res.status(204).send())
  })
}

export function listarTarefasPorTipo(
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const tipoTarefa: any = req.query.tipo

  TarefasModel.find(tipoTarefa, (_err, tarefas: any) => {
    tarefas = _.groupBy(tarefas, 'idUsuario')
    return formatOutput(res, tarefas, 200, 'tarefa-tipo')
  })
}
