import { Request, Response, NextFunction } from 'express'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import halson from 'halson'
import _ from 'lodash'
import { logger } from '../common/logging'
import { formatOutput } from '../util/formatApi'

import { UserModel } from '../database/schemas/user'
import { TaskModel } from '../database/schemas/task'

export function listar(req: Request, res: Response, next: NextFunction): void {
  const limit: number = Number(req.query.limit) || 0
  const offset: number = Number(req.query.offset) || 0

  TaskModel.find({}, null, { skip: offset, limit }).then(task => {
    if (task) {
      task = task.map(task => {
        return halson(task)
          .addLink('self', `/task/${task.id}`)
          .addLink('user', { href: `/user/${task.userId}` })
      })
    }
    return formatOutput(res, task, 200, 'tarefa')
  })
}

export function adicionar(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { userId } = req.body

  UserModel.findById(userId, (err, user) => {
    if (!user) {
      return res.status(404).send()
    }

    const newTask = new TaskModel(req.body)

    newTask.save((_err: any, task: any) => {
      task = halson(task.toJSON())
        .addLink('self', `/task/${task.id}`)
        .addLink('user', { href: `/users/${task.userId}` })
      return formatOutput(res, task, 201, 'task')
    })
  })
}

export function listarPorId(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { id } = req.params

  TaskModel.findById(id, (_err, task) => {
    if (!task) {
      return res.status(404).send()
    }
    logger.info(task)
    task = halson(task).addLink('self', `/task/${task?.id}`)
    return formatOutput(res, task, 200, 'task')
  })
}

export function remover(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params

  TaskModel.findById(id, (_err, task) => {
    if (!task) {
      return res.status(404).send()
    }
    return task.remove(_err => res.status(204).send())
  })
}

export function listarPorTipo(req: Request, res: Response, next: NextFunction) {
  const { status } = req.query
  const typeString = status
  TaskModel.find({ taskStatus: status }, (err: any, tasks: any) => {
    tasks = _.groupBy(tasks, 'idUser')
    return formatOutput(res, tasks, 200, 'tarefa_tipo')
  })
}
