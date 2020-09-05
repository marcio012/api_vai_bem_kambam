import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'

import * as jwt from 'jsonwebtoken'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import halson from 'halson'

import { formatOutput } from '../util/formatApi'
import errorHandler from '../helpers/dbErrorHandler'
import { logger } from '../common/logging'

import { TaskModel } from '../database/schemas/task'
import { UserModel } from '../database/schemas/user'

export async function getOne(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const { username } = req.params

  UserModel.findOne({ username }, (err, user) => {
    if (!user) {
      return res.status(404).send()
    }
    // user = user.toJSON()

    user._id = user._id.toString()
    logger.info(`User ${user.username} list`)
    user = halson(user).addLink('self', `/users/${user._id}`)
    return formatOutput(res, user, 200, 'user')
  })
}

// async createUser(req: Request, res: Response): Promise < void> {
//   const newUser = new User(req.body);
//   await newUser.save();
//   res.json({ status: 200, newUser });
// }

export async function add(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const user = new UserModel(req.body)

  user.password = bcrypt.hashSync(user.password, 10)

  user.save((error, user) => {
    if (error) {
      return res.status(500).send(error)
    }
    user = halson(user.toJSON()).addLink('self', `/users/${user._id}`)
    logger.info(`User ${user.username} salvo na base de dados`)
    return formatOutput(res, user, 201, 'user')
  })
}

export function update(req: Request, res: Response, _next: NextFunction): void {
  const { username } = req.params

  UserModel.findOne({ username }, (_err, user) => {
    if (!user) {
      return res.status(404).send()
    }
    user.username = req.body.username || user.username
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password
    user.updated = req.body.updated || new Date()
    user.save(_err => {
      return res.status(204).send()
    })
    return formatOutput(res, user, 204, 'user')
  })
}

export function remove(req: Request, res: Response, _next: NextFunction): void {
  const { username } = req.params

  UserModel.findOne({ username }, (_err, user) => {
    if (!user) {
      return formatOutput(res, {}, 404, 'User not found!')
    }
    user.remove(_err => {
      return res.status(204).send()
    })
  })
}

export function getTaskByUser(
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const { userId } = req.params
  const limit: number = Number(req.query.limit) || 0
  const offset: number = Number(req.query.offset) || 0

  TaskModel.find({}, null, { skip: offset, limit }).then(task => {
    logger.info(task)
    if (task) {
      let taskFilterUserId = task.filter(function (task) {
        return true
      })
      taskFilterUserId = taskFilterUserId.filter(task => {
        return halson(task)
          .addLink('self', { href: `/user/${task.userId}` })
          .addLink('tasks', `/tasks/${task?._id}`)
      })
      return formatOutput(res, taskFilterUserId, 200, 'tarefa')
    }
  })
}

export function login(req: Request, res: Response, _next: NextFunction): void {
  const { password } = req.query
  const username = String(req.query.username)

  UserModel.findOne({ username }, (err, user) => {
    if (!user) {
      return res.status(404).send()
    }

    const validate = bcrypt.compareSync(password, user.password.valueOf())

    if (validate) {
      const body = { id: user.id, email: user.email }

      const token = jwt.sign({ user: body }, 'top_secret')

      return res.json({ token })
    }
    return res.status(401).send()
  })
}
