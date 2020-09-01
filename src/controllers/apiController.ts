import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import { ApplicationType } from '../models/applicationType'
import { formatOutput } from '../util/formatApi'

export const getApi = (req: Req, res: Res, _next: Next) => {
  return formatOutput(res, { title: 'Bem Vindo' }, 200, ApplicationType.JSON)
}
