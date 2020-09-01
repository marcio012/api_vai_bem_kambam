import { NextFunction as Next, Request as Req, Response as Res } from 'express'
import _ from 'lodash'
import { TipoTarefa } from '../models/tipoTarefa'
import Tarefa from '../models/tarefa'
import { logger } from '../common/logging'

let listaTarefas: Array<Tarefa> = []

export const salvarTarefas = (req: Req, res: Res, _next: Next) => {
  const tarefa: Tarefa = {
    // generic random value from 1 to 100 only for tests so far
    id: 1,
    idUsuario: req.body.idUsuario,
    conteudo: req.body.conteudo,
    dataEntrega: new Date(),
    tipo: TipoTarefa.AFazer,
    completada: false,
  }

  logger.info(
    `${tarefa.id} - ${tarefa.idUsuario} - ${tarefa.conteudo} - ${tarefa.dataEntrega}`,
  )
  listaTarefas.push(tarefa)
  return res.status(201).send(tarefa)
}

export const listarUmaTarefas = (req: Req, res: Res, _next: Next) => {
  const { id } = req.params
  const tarefa = listaTarefas.find(obj => obj.id === Number(id))
  const httpStatusCode = tarefa ? 200 : 404
  return res.status(httpStatusCode).send(tarefa)
}

export const listarTodasTarefas = (req: Req, res: Res, _next: Next) => {
  const limit = Number(req.query.limit) || Number(listaTarefas.length)
  const offset = Number(req.query.offset) || 0
  return res.status(200).send(_(listaTarefas).drop(offset).take(limit).value())
}

export const removerTarefas = (req: Req, res: Res, _next: Next) => {
  const id = Number(req.params.id)
  const tarefaIndex = listaTarefas.findIndex(item => item.id === id)

  if (tarefaIndex === -1) {
    return res.status(404).send()
  }

  listaTarefas = listaTarefas.filter(item => item.id !== id)

  return res.status(204).send()
}

export const listarTarefasPorTipo = (req: Req, res: Res, _next: Next) => {
  const { tipo } = req.query
  let tarefasTiposLista = listaTarefas
  if (tipo) {
    tarefasTiposLista = tarefasTiposLista.filter(tarefa => tarefa.tipo === tipo)
  }

  const grupoTarefaTipo = _.groupBy(tarefasTiposLista, 'tipo')
  return res.status(200).send(grupoTarefaTipo)
}
