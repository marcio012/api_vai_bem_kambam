import { NextFunction as Next, Request as Req, Response as Res } from 'express'
import _ from 'lodash'
import { TipoTarefa } from '../models/tipoTarefa'
import Tarefa from '../models/tarefa'
import { ApplicationType } from '../models/applicationType'
import { formatOutput } from '../util/formatApi'

let listaTarefas: Array<Tarefa> = []
const APPLICATION_JSON = 'application/json'

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

  listaTarefas.push(tarefa)

  return formatOutput(res, tarefa, 201, ApplicationType.JSON)
}

export const listarUmaTarefas = (req: Req, res: Res, _next: Next) => {
  const { id } = req.params
  const tarefa = listaTarefas.find(obj => obj.id === Number(id))
  const httpStatusCode = tarefa ? 200 : 404

  return formatOutput(res, tarefa, httpStatusCode, ApplicationType.JSON)
}

export const listarTodasTarefas = (req: Req, res: Res, _next: Next) => {
  const limit = Number(req.query.limit) || Number(listaTarefas.length)
  const offset = Number(req.query.offset) || 0

  const listaTarefasFiltro = _(listaTarefas).drop(offset).take(limit).value()

  return formatOutput(res, listaTarefasFiltro, 200, ApplicationType.JSON)
}

export const removerTarefas = (req: Req, res: Res, _next: Next) => {
  const id = Number(req.params.id)
  const tarefaIndex = listaTarefas.findIndex(item => item.id === id)

  if (tarefaIndex === -1) {
    return res.format({
      json: () => {
        res.type(APPLICATION_JSON)
        res.status(404).json()
      },
    })
  }

  listaTarefas = listaTarefas.filter(item => item.id !== id)
  return formatOutput(res, listaTarefas, 204, ApplicationType.JSON)
}

export const listarTarefasPorTipo = (req: Req, res: Res, _next: Next) => {
  const { tipo } = req.query
  let tarefasTiposLista = listaTarefas
  if (tipo) {
    tarefasTiposLista = tarefasTiposLista.filter(tarefa => tarefa.tipo === tipo)
  }

  const grupoTarefaTipo = _.groupBy(tarefasTiposLista, 'tipo')

  return formatOutput(res, grupoTarefaTipo, 200, ApplicationType.JSON)
}
