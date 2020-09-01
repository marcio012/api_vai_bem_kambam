import { NextFunction, Request, Response } from 'express'
import * as _ from 'lodash'
import { TipoTarefa } from '../models/tipoTarefa'
import Tarefa from '../models/tarefa'

let listaTarefas: Array<Tarefa> = []

export const getOrder = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const tarefa = listaTarefas.find(obj => obj.id === Number(id))
  const httpStatusCode = tarefa ? 200 : 404
  return res.status(httpStatusCode).send(tarefa)
}

export const addOrder = (req: Request, res: Response, next: NextFunction) => {
  const tarefa: Tarefa = {
    // generic random value from 1 to 100 only for tests so far
    id: Math.floor(Math.random() * 100) + 1,
    idUsuario: req.body.userId,
    conteudo: req.body.quantity,
    dataEntrega: req.body.shipDate,
    tipo: TipoTarefa.AFazer,
    completada: false,
  }
  listaTarefas.push(tarefa)
  return res.status(201).send(tarefa)
}

export const removeOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id)
  const tarefaIndex = listaTarefas.findIndex(item => item.id === id)

  if (tarefaIndex === -1) {
    return res.status(404).send()
  }

  listaTarefas = listaTarefas.filter(item => item.id !== id)

  return res.status(204).send()
}
