import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import { formatOutput } from '../util/formatApi'

export const getApi = (req: Req, res: Res, next: Next) => {
  return formatOutput(res, { title: 'Bem Vindo' }, 200, 'api')
}
